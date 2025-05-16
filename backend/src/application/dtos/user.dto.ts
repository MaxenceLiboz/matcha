// Input DTO for creating a user
export interface CreateUserDTO {
    email: string;
    username: string;
    last_name: string;
    first_name: string;
}
  
// Output DTO for user responses
export interface UserResponseDTO {
    // id: string;
    email: string;
    username: string;
    last_name: string;
    first_name: string;
    verified: boolean;
}