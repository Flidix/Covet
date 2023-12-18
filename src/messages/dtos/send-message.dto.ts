import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class SendMessageDto{
    @IsString()
    @IsNotEmpty()
    message: string;

    @IsNumber()
    @IsNotEmpty()
    groupId: number;
}