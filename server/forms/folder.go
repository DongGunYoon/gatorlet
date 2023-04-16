package forms

type BaseFolderForm struct {
	Title string `json:"title" binding:"required"`
}

type CreateFolderForm struct {
	BaseFolderForm
}

type UpdateFolderForm struct {
	BaseFolderForm
}
