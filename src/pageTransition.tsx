import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useLocation } from 'react-router-dom';

/* A component that wraps the page content and applies a fade in/out transition 
(we're drawing the style from a global css file)
I tried a few different approaches (viewTransitions API, Framer Motion)
but this was the simplest and most effective approach I could find asI couldn't get the others working
*/
const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  console.log("Transition Key:", location.key);

  return (
    <TransitionGroup>
      <CSSTransition
        key={location.pathname} // changed from location.key to prevent a bug where the page tried to render 3 times
        classNames="page"
        timeout={300}
      >
        <div>{children}</div>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default PageTransition;
