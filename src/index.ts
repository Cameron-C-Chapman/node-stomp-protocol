import { openStream } from './stream';
import { StompServerCommandListener, StompClientCommandListener, StompServerCommands, StompClientCommands } from './protocol';
import {
    StompServerSessionLayer, StompClientSessionLayer, StompSessionLayer,
    StompClientCommandListenerConstructor, StompServerCommandListenerConstructor
} from './session';
import { StompFrameLayer } from './frame';
import { StompConfig, StompHeaders, StompError } from './model';
import { Socket } from 'net';
import * as WebSocket from 'ws';
export { StompServerSessionLayer, StompClientSessionLayer };
export * from './protocol'
export * from './model'
export { setLoggingListeners, LoggerFunction, StompProtocolLoggingListeners } from './utils'

export function createStompServerSession(socket: Socket | WebSocket, listener: StompClientCommandListenerConstructor | StompClientCommandListener, config?: StompConfig): StompServerSessionLayer {
    const streamLayer = openStream(socket);
    const frameLayer = new StompFrameLayer(streamLayer);
    frameLayer.headerFilter = config && config.headersFilter || frameLayer.headerFilter;
    return new StompServerSessionLayer(frameLayer, listener);
}

export function createStompClientSession(socket: Socket | WebSocket, listener: StompServerCommandListenerConstructor | StompServerCommandListener, config?: StompConfig): StompClientSessionLayer {
    const streamLayer = openStream(socket);
    const frameLayer = new StompFrameLayer(streamLayer);
    frameLayer.headerFilter = config && config.headersFilter || frameLayer.headerFilter;
    return new StompClientSessionLayer(frameLayer, listener);
}
