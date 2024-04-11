export type User = {
    userName:string,
    BotsList:Array<Bot>
    groupsFrom:string[]
    groupsToSend:string[]
}|null

export type Bot = {
    id:string,
    BotName:string,
    Ending:string,
    groupsList:Array<string>
    fromGroup:string,
    linkView:boolean,
    txt_Photo:boolean
}

