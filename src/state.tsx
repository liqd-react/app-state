type State = 'foreground' | 'background';
type StateHandler = ( state: State ) => unknown;

const resolveState = () => document.visibilityState === 'visible' ? 'foreground' : 'background';

let currentState: State = resolveState();
let handlers = new Set<StateHandler>();

document.addEventListener( 'visibilitychange', () =>
{
    const newState = resolveState();

    if( currentState !== newState )
    {
        currentState = newState;
        handlers.forEach( handler => handler( newState ));
    }
});

export default class ApplicationState
{
    static get current()
    {
        return currentState;
    }

    static listen( handler: StateHandler )
    {
        handlers.add( handler );
    }

    static dismiss( handler: StateHandler )
    {
        handlers.delete( handler );
    }
}