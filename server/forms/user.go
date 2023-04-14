package forms

type BaseUserForm struct {
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type RegisterForm struct {
	BaseUserForm
	Name string `json:"name" binding:"required"`
}

type LoginForm struct {
	BaseUserForm
}
