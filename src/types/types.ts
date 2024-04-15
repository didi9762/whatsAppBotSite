export type User = {
    userName:string,
    BotsList:{
        [id:string]:Bot
    }
    groupsFrom:string[]
    groupsToSend:string[]
}|null



export type Bot = {
    id:string,
    BotName:string,
    Ending:string,
    bugsGroup:string,
    groupsList:Array<string>,
    allGroups:Array<string>,
    fromGroup:string,
    linkView:boolean,
    txt_Photo:boolean,
    online:boolean
}

