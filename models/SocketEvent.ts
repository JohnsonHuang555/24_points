export enum SocketEvent {
  // f2e emit
  ErrorMessage = 'error-message',
  JoinRoom = 'join-room',
  ReadyGame = 'ready-game',
  StartGame = 'start-game',
  RoomUpdate = 'room-update',
  SearchRooms = 'search-rooms',
  SendMessage = 'send-message',
  RemovePlayer = 'remove-player',
  // only multiple mode
  EditRoomName = 'edit-room-name',
  EditRoomSettings = 'edit-room-settings',
  CheckRoomPassword = 'check-room-password',

  // game event
  PlayCard = 'play-card',
  DrawCard = 'draw-card',
  DiscardCard = 'discard-card',
  UpdateScore = 'update-score',
  SelectCard = 'select-card',
  ReselectCard = 'reselect-card',
  BackCard = 'back-card',

  // b2e emit
  JoinRoomSuccess = 'join-room-success',
  GetPlayerId = 'get-player-id',
  PlayCardResponse = 'play-card-response',
  GetRoomsResponse = 'get-rooms-response',
  GetMessage = 'get-message',
  RemovePlayerResponse = 'remove-play-response',
  PlayerLeaveRoom = 'player-leave-room', // 玩家在遊戲中離開房間
  NeedRoomPassword = 'need-room-password',
  GameOver = 'game-over',
  CountdownTimeResponse = 'countdown-time-response',
}
