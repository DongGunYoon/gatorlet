package forms

type CreateCardForm struct {
	Question string `json:"question" binding:"required"`
	Answer   string `json:"answer" binding:"required"`
	FolderId string `json:"folderId" binding:"required"`
}

type UpdateCardForm struct {
	Question string `json:"question" binding:"required"`
	Answer   string `json:"answer" binding:"required"`
}
