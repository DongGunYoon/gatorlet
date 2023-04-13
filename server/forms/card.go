package forms

type BaseCardForm struct {
	Question string `json:"question" binding:"required"`
	Answer   string `json:"answer" binding:"required"`
}

type CreateCardForm struct {
	BaseCardForm
	FolderId string `json:"folderId" binding:"required"`
}

type UpdateCardForm struct {
	BaseCardForm
}

type CreateCardsForm struct {
	FolderId string         `json:"folderId" binding:"required"`
	Cards    []BaseCardForm `json:"cards" binding:"required,dive"`
}
