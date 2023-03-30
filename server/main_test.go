package main

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"regexp"
	"testing"

	"github.com/google/uuid"
	"github.com/stretchr/testify/assert"
)

func TestSignUp(t *testing.T) {
	type Response struct {
		Status  int                    `json:"status"`
		Message string                 `json:"message"`
		Data    map[string]interface{} `json:"data"`
	}

	router := setupRouter()
	regex := regexp.MustCompile("-")

	email := regex.ReplaceAllString(uuid.New().String(), "") + "@test.com"
	data := map[string]string{"email": email, "password": "testerPassword", "name": "test"}
	body, _ := json.Marshal(data)

	request, err := http.NewRequest("POST", "/users/signup", bytes.NewBuffer(body))
	assert.NoError(t, err)

	w := httptest.NewRecorder()
	router.ServeHTTP(w, request)

	var resp Response
	err = json.Unmarshal(w.Body.Bytes(), &resp)

	assert.NoError(t, err)
	assert.Equal(t, http.StatusCreated, w.Code)
	assert.Equal(t, "Success", resp.Message)
	assert.Equal(t, 201, resp.Status)
	assert.NotNil(t, resp.Data)
}

func TestSignUpWithDuplicateEmail(t *testing.T) {
	type Response struct {
		Status  int                    `json:"status"`
		Message string                 `json:"message"`
		Data    map[string]interface{} `json:"data"`
	}

	router := setupRouter()

	email := "tester@gmail.com"
	data := map[string]string{"email": email, "password": "testerPassword", "name": "test"}
	body, _ := json.Marshal(data)

	request, err := http.NewRequest("POST", "/users/signup", bytes.NewBuffer(body))
	assert.NoError(t, err)

	w := httptest.NewRecorder()
	router.ServeHTTP(w, request)

	var resp Response
	err = json.Unmarshal(w.Body.Bytes(), &resp)

	assert.NoError(t, err)
	assert.Equal(t, http.StatusBadRequest, w.Code)
	assert.Equal(t, "Email Already Taken", resp.Message)
	assert.Equal(t, 400, resp.Status)
	assert.Nil(t, resp.Data)
}

func TestLogIn(t *testing.T) {
	type Response struct {
		Status  int                    `json:"status"`
		Message string                 `json:"message"`
		Data    map[string]interface{} `json:"data"`
	}

	router := setupRouter()

	data := map[string]string{"email": "tester@gmail.com", "password": "testerPassword"}
	body, _ := json.Marshal(data)

	request, err := http.NewRequest("POST", "/users/login", bytes.NewBuffer(body))
	assert.NoError(t, err)

	w := httptest.NewRecorder()
	router.ServeHTTP(w, request)

	var resp Response
	err = json.Unmarshal(w.Body.Bytes(), &resp)

	assert.NoError(t, err)
	assert.Equal(t, http.StatusOK, w.Code)
	assert.Equal(t, "Success", resp.Message)
	assert.Equal(t, 200, resp.Status)
	assert.NotNil(t, resp.Data)
}

func TestGetUser(t *testing.T) {
	type Response struct {
		Status  int                    `json:"status"`
		Message string                 `json:"message"`
		Data    map[string]interface{} `json:"data"`
	}

	router := setupRouter()

	data := map[string]string{"email": "tester@gmail.com", "password": "testerPassword"}
	body, _ := json.Marshal(data)

	request, err := http.NewRequest("POST", "/users/login", bytes.NewBuffer(body))
	assert.NoError(t, err)

	w := httptest.NewRecorder()
	router.ServeHTTP(w, request)

	var resp Response
	err = json.Unmarshal(w.Body.Bytes(), &resp)

	token := resp.Data["accessToken"].(string)

	request, err = http.NewRequest("GET", "/user", nil)
	assert.NoError(t, err)

	request.Header.Set("Authorization", token)

	w = httptest.NewRecorder()
	router.ServeHTTP(w, request)

	err = json.Unmarshal(w.Body.Bytes(), &resp)

	assert.NoError(t, err)
	assert.Equal(t, http.StatusOK, w.Code)
	assert.Equal(t, "Success", resp.Message)
	assert.Equal(t, 200, resp.Status)
	assert.NotNil(t, resp.Data)
}

func TestCreateFolder(t *testing.T) {
	type Response struct {
		Status  int                    `json:"status"`
		Message string                 `json:"message"`
		Data    map[string]interface{} `json:"data"`
	}

	router := setupRouter()

	data := map[string]string{"email": "tester@gmail.com", "password": "testerPassword"}
	body, _ := json.Marshal(data)

	request, err := http.NewRequest("POST", "/users/login", bytes.NewBuffer(body))
	assert.NoError(t, err)

	w := httptest.NewRecorder()
	router.ServeHTTP(w, request)

	var resp Response
	err = json.Unmarshal(w.Body.Bytes(), &resp)

	token := resp.Data["accessToken"].(string)

	//have to change folder name each time if not it will be duplicate
	title := "test folder3"
	folderData := map[string]string{"title": title}
	folderBody, _ := json.Marshal(folderData)

	folderRequest, folderErr := http.NewRequest("POST", "/folder", bytes.NewBuffer(folderBody))
	assert.NoError(t, folderErr)

	folderRequest.Header.Set("Authorization", token)

	x := httptest.NewRecorder()
	router.ServeHTTP(x, folderRequest)

	var folderResp Response
	folderErr = json.Unmarshal(x.Body.Bytes(), &folderResp)

	assert.NoError(t, folderErr)
	assert.Equal(t, http.StatusCreated, x.Code)
	assert.Equal(t, "Success", folderResp.Message)
	assert.Equal(t, 201, folderResp.Status)
	assert.NotNil(t, folderResp.Data)
}

func TestCreateFolderWithDuplicateFolder(t *testing.T) {
	type Response struct {
		Status  int                    `json:"status"`
		Message string                 `json:"message"`
		Data    map[string]interface{} `json:"data"`
	}

	router := setupRouter()

	data := map[string]string{"email": "tester@gmail.com", "password": "testerPassword"}
	body, _ := json.Marshal(data)

	request, err := http.NewRequest("POST", "/users/login", bytes.NewBuffer(body))
	assert.NoError(t, err)

	w := httptest.NewRecorder()
	router.ServeHTTP(w, request)

	var resp Response
	err = json.Unmarshal(w.Body.Bytes(), &resp)

	token := resp.Data["accessToken"].(string)

	title := "test folder"
	folderData := map[string]string{"title": title}
	folderBody, _ := json.Marshal(folderData)

	folderRequest, folderErr := http.NewRequest("POST", "/folder", bytes.NewBuffer(folderBody))
	assert.NoError(t, folderErr)

	folderRequest.Header.Set("Authorization", token)

	x := httptest.NewRecorder()
	router.ServeHTTP(x, folderRequest)

	var folderResp Response
	folderErr = json.Unmarshal(x.Body.Bytes(), &folderResp)

	assert.NoError(t, folderErr)
	assert.Equal(t, http.StatusBadRequest, x.Code)
	assert.Equal(t, "Folder Name Already Taken", folderResp.Message)
	assert.Equal(t, 400, folderResp.Status)
	assert.NotNil(t, folderResp.Data)
}
