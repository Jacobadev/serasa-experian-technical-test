import { Body, Controller, Post, HttpCode, HttpStatus } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBody,
    ApiConflictResponse,
    ApiUnauthorizedResponse,
    ApiBadRequestResponse
} from "@nestjs/swagger";
import { UserResponseDto } from "@app/user/dto/user-response.dto";
import {UserService} from "@app/user";
import {LoginRequestDto, LoginResponseDto} from "@app/auth/dto/login.dto";
import {SignupRequestDto} from "@app/auth/dto/signup.dto";


@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) {}

    @Post('login')

    @HttpCode(HttpStatus.OK)

    @ApiOperation({
        summary: 'User Login',
        description: 'Authenticates a user and returns a JWT access token upon successful login.'
    })

    @ApiBody({ type: LoginRequestDto })

    @ApiResponse({
        status: 200,
        description: 'User successfully authenticated.',
        type: LoginResponseDto,
    })
    @ApiUnauthorizedResponse({ description: 'Invalid credentials provided.' })
    async login(@Body() loginDto: LoginRequestDto): Promise<LoginResponseDto> {

        return this.authService.login(loginDto);
    }

    @Post('signup')

    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({
        summary: 'User Signup',
        description: 'Registers a new user in the system.'
    })
    @ApiBody({ type: SignupRequestDto })
    @ApiResponse({
        status: 201,
        description: 'User successfully created.',
        type: UserResponseDto,
    })
    @ApiBadRequestResponse({ description: 'Invalid data provided. Check validation errors.' })
    @ApiConflictResponse({ description: 'A user with this email already exists.' })
    async signup(@Body() signupDto: SignupRequestDto): Promise<UserResponseDto> {
        return this.userService.create(signupDto);
    }
}