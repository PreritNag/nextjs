import { z } from "zod";

export const AcceptMsgSchema = z.object({
    acceptMessages: z.boolean(),});
    