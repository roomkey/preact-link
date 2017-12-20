# preact-link

navigate to localhost:8000/preact.html or localhost:8000/react.html

the error has to do with preact "reusing" the <div> nodes at the same level, which when message is set, getting to the second div, to render link-1 it reuses former link-2.

I would have expected that the component instance would not be bound to that vdom, but it seems preact gets confused and the state for the intance of that vdom for link-2 is assumed which is wrong.
