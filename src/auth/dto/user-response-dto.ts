import { ApiProperty } from "@nestjs/swagger";

export class UserResponseDto {
    @ApiProperty({
        description: 'The unique identifier for the user.',
        example: 1234,
    })
    id: number;

    @ApiProperty({
        description: 'The user\'s full name.',
        example: 'John Doe',
    })
    name: string;

    @ApiProperty({
        description: 'The user\'s unique email address.',
        example: 'john.doe@example.com',
    })
    email: string;
}