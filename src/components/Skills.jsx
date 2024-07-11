import React, { useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import { useInView } from 'react-intersection-observer'; 

const Skills = () => {
    const h2Ref = useRef(null); // Ref for h2
    const { ref, inView } = useInView({
      triggerOnce: true,
      threshold: 0.5, // Trigger when 50% of the element is in view
    });
  
    const h2Animation = useSpring({
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(30px)',
      config: { duration: 1000 },
    });
  
    const iconAnimation = useSpring({
      opacity: inView ? 1 : 0,
      transform: inView ? 'scale(1)' : 'scale(0.5)',
      config: { duration: 1000 },
    });
  

  return (
    <div className="skills-container">
       <animated.h2
        ref={h2Ref}
        className="h2"
        style={h2Animation}        
      >
        My skills
      </animated.h2>

      <div className="icon-container" ref={ref}>
          <animated.svg
            className='icon html-icon'
            style={iconAnimation}
            viewBox="0 0 128 128"
            >
                <path fill="#E44D26" d="M19.569 27l8.087 89.919 36.289 9.682 36.39-9.499L108.431 27H19.569zM91.61 47.471l-.507 5.834L90.88 56H48.311l1.017 12h40.54l-.271 2.231-2.615 28.909-.192 1.69L64 106.964v-.005l-.027.012-22.777-5.916L39.65 84h11.168l.791 8.46 12.385 3.139.006-.234v.012l12.412-2.649L77.708 79H39.153l-2.734-30.836L36.152 45h55.724l-.266 2.471zM27.956 1.627h5.622v5.556h5.144V1.627h5.623v16.822h-5.623v-5.633h-5.143v5.633h-5.623V1.627zm23.782 5.579h-4.95V1.627h15.525v5.579h-4.952v11.243h-5.623V7.206zm13.039-5.579h5.862l3.607 5.911 3.603-5.911h5.865v16.822h-5.601v-8.338l-3.867 5.981h-.098l-3.87-5.981v8.338h-5.502V1.627zm21.736 0h5.624v11.262h7.907v5.561H86.513V1.627z"></path>
            </animated.svg> 
            
           
            <animated.svg
                className='icon css-icon'                 
                style={iconAnimation}
                viewBox="0 0 128 128"
                >
                <path fill="#1572B6" d="M19.67 26l8.069 90.493 36.206 10.05 36.307-10.063L108.33 26H19.67zm69.21 50.488L86.53 98.38l.009 1.875L64 106.55v.001l-.018.015-22.719-6.225L39.726 83h11.141l.79 8.766 12.347 3.295-.004.015v-.032l12.394-3.495L77.702 77H51.795l-.222-2.355-.506-5.647L50.802 66h27.886l1.014-11H37.229l-.223-2.589-.506-6.03L36.235 43h55.597l-.267 3.334-2.685 30.154M89 14.374L81.851 6H89V1H73v4.363L81.39 13H73v5h16zm-19 0L63.193 6H70V1H55v4.363L62.733 13H55v5h15zM52 13h-8V6h8V1H38v17h14z"></path>
            </animated.svg>

            
            <animated.svg
                className='icon js-icon'               
                style={iconAnimation}
                viewBox="0 0 128 128"
                >
                <path fill="#F0DB4F" d="M2 1v125h125V1H2zm66.119 106.513c-1.845 3.749-5.367 6.212-9.448 7.401-6.271 1.44-12.269.619-16.731-2.059-2.986-1.832-5.318-4.652-6.901-7.901l9.52-5.83c.083.035.333.487.667 1.071 1.214 2.034 2.261 3.474 4.319 4.485 2.022.69 6.461 1.131 8.175-2.427 1.047-1.81.714-7.628.714-14.065C58.433 78.073 58.48 68 58.48 58h11.709c0 11 .06 21.418 0 32.152.025 6.58.596 12.446-2.07 17.361zm48.574-3.308c-4.07 13.922-26.762 14.374-35.83 5.176-1.916-2.165-3.117-3.296-4.26-5.795 4.819-2.772 4.819-2.772 9.508-5.485 2.547 3.915 4.902 6.068 9.139 6.949 5.748.702 11.531-1.273 10.234-7.378-1.333-4.986-11.77-6.199-18.873-11.531-7.211-4.843-8.901-16.611-2.975-23.335 1.975-2.487 5.343-4.343 8.877-5.235l3.688-.477c7.081-.143 11.507 1.727 14.756 5.355.904.916 1.642 1.904 3.022 4.045-3.772 2.404-3.76 2.381-9.163 5.879-1.154-2.486-3.069-4.046-5.093-4.724-3.142-.952-7.104.083-7.926 3.403-.285 1.023-.226 1.975.227 3.665 1.273 2.903 5.545 4.165 9.377 5.926 11.031 4.474 14.756 9.271 15.672 14.981.882 4.916-.213 8.105-.38 8.581z"></path>
            </animated.svg>
            
           
            <animated.svg
                className='icon react-icon'               
                style={iconAnimation}
                viewBox="0 0 128 128"
                >
                <g fill="#61DAFB"><circle cx="64" cy="47.5" r="9.3"></circle><path d="M64 81.7C71.3 88.8 78.5 93 84.3 93c1.9 0 3.7-.4 5.2-1.3 5.2-3 7.1-10.5 5.3-21.2-.3-1.9-.7-3.8-1.2-5.8 2-.6 3.8-1.2 5.6-1.8 10.1-3.9 15.7-9.3 15.7-15.2 0-6-5.6-11.4-15.7-15.2-1.8-.7-3.6-1.3-5.6-1.8.5-2 .9-3.9 1.2-5.8 1.7-10.9-.2-18.5-5.4-21.5-1.5-.9-3.3-1.3-5.2-1.3-5.7 0-13 4.2-20.3 11.3C56.7 6.3 49.5 2.1 43.7 2.1c-1.9 0-3.7.4-5.2 1.3-5.2 3-7.1 10.5-5.3 21.2.3 1.9.7 3.8 1.2 5.8-2 .6-3.8 1.2-5.6 1.8-10.1 3.9-15.7 9.3-15.7 15.2 0 6 5.6 11.4 15.7 15.2 1.8.7 3.6 1.3 5.6 1.8-.5 2-.9 3.9-1.2 5.8-1.7 10.7.2 18.3 5.3 21.2 1.5.9 3.3 1.3 5.2 1.3 5.8.2 13-4 20.3-11zm-5.6-13.5c1.8.1 3.7.1 5.6.1 1.9 0 3.8 0 5.6-.1-1.8 2.4-3.7 4.6-5.6 6.7-1.9-2.1-3.8-4.3-5.6-6.7zM46 57.9c1 1.7 1.9 3.3 3 4.9-3.1-.4-6-.9-8.8-1.5.9-2.7 1.9-5.5 3.1-8.3.8 1.6 1.7 3.3 2.7 4.9zm-5.8-24.1c2.8-.6 5.7-1.1 8.8-1.5-1 1.6-2 3.2-3 4.9-1 1.7-1.9 3.3-2.7 5-1.3-2.9-2.3-5.7-3.1-8.4zm5.5 13.7c1.3-2.7 2.7-5.4 4.3-8.1 1.5-2.6 3.2-5.2 4.9-7.8 3-.2 6-.3 9.1-.3 3.2 0 6.2.1 9.1.3 1.8 2.6 3.4 5.2 4.9 7.8 1.6 2.7 3 5.4 4.3 8.1-1.3 2.7-2.7 5.4-4.3 8.1-1.5 2.6-3.2 5.2-4.9 7.8-3 .2-6 .3-9.1.3-3.2 0-6.2-.1-9.1-.3-1.8-2.6-3.4-5.2-4.9-7.8-1.6-2.7-3-5.4-4.3-8.1zm39.1-5.4l-2.7-5c-1-1.7-1.9-3.3-3-4.9 3.1.4 6 .9 8.8 1.5-.9 2.8-1.9 5.6-3.1 8.4zm0 10.8c1.2 2.8 2.2 5.6 3.1 8.3-2.8.6-5.7 1.1-8.8 1.5 1-1.6 2-3.2 3-4.9.9-1.5 1.8-3.2 2.7-4.9zm2.3 34.7c-.8.5-1.8.7-2.9.7-4.9 0-11-4-17-10 2.9-3.1 5.7-6.6 8.5-10.5 4.7-.4 9.2-1.1 13.4-2.1.5 1.8.8 3.6 1.1 5.4 1.4 8.5.3 14.6-3.1 16.5zm5.2-52.7c11.2 3.2 17.9 8.1 17.9 12.6 0 3.9-4.6 7.8-12.7 10.9-1.6.6-3.4 1.2-5.2 1.7-1.3-4.1-2.9-8.3-4.9-12.6 2-4.3 3.7-8.5 4.9-12.6zm-8-28.2c1.1 0 2 .2 2.9.7 3.3 1.9 4.5 7.9 3.1 16.5-.3 1.7-.7 3.5-1.1 5.4-4.2-.9-8.7-1.6-13.4-2.1-2.7-3.9-5.6-7.4-8.5-10.5 6-5.9 12.1-10 17-10zM69.6 26.8c-1.8-.1-3.7-.1-5.6-.1s-3.8 0-5.6.1c1.8-2.4 3.7-4.6 5.6-6.7 1.9 2.1 3.8 4.4 5.6 6.7zM40.9 7.4c.8-.5 1.8-.7 2.9-.7 4.9 0 11 4 17 10-2.9 3.1-5.7 6.6-8.5 10.5-4.7.4-9.2 1.1-13.4 2.1-.5-1.8-.8-3.6-1.1-5.4-1.4-8.5-.3-14.5 3.1-16.5zm-5.2 52.7C24.5 56.9 17.8 52 17.8 47.5c0-3.9 4.6-7.8 12.7-10.9 1.6-.6 3.4-1.2 5.2-1.7 1.3 4.1 2.9 8.3 4.9 12.6-2 4.3-3.7 8.6-4.9 12.6zm2.1 11c.3-1.7.7-3.5 1.1-5.4 4.2.9 8.7 1.6 13.4 2.1 2.7 3.9 5.6 7.4 8.5 10.5-6 5.9-12.1 10-17 10-1.1 0-2-.2-2.9-.7-3.4-1.9-4.5-8-3.1-16.5zm-4.2 41.2c2.2-2.7 2.3-5.7 1.1-8.7-1.2-3-3.7-4.4-6.8-4.5-3.7-.1-7.5 0-11.2 0H16V125h3v-9.8h4.7c.6 0 1.1.2 1.4.7l6 9.3c.1.2.4.5.6.5h3.9c-2.4-3.7-4.7-7.2-7.1-10.8 2.1-.3 3.9-1 5.1-2.6zm-14.6-.2v-9.9h1.1c2.3 0 4.7-.1 7 .1 2.7.1 4.6 2.2 4.6 4.9s-2.2 4.8-4.9 4.9c-2.4.1-4.8 0-7.8 0zm38.7 1.3c-1.6-7-8-8.8-12.9-6.6-3.8 1.7-5.5 5-5.6 9.1-.1 3.1.8 5.9 3.2 8 2.7 2.4 6 2.7 9.4 2.1 1.9-.4 3.6-1.3 4.9-2.7-.5-.7-1-1.4-1.5-2-2.8 2.4-5.9 3.2-9.3 1.6-2.2-1.1-3.3-3.8-3.5-5.8h15.5v-1.3c.1-.9 0-1.7-.2-2.4zM42.6 115c-.3-3 2.7-6.2 6-6.2 3.8-.1 6.2 2.2 6.3 6.2H42.6zm30.7-8.7c-1.5-.3-3.1-.4-4.6-.3-2.4.2-4.5 1.3-6.2 3.1.5.7.9 1.4 1.5 2.2.2-.2.4-.4.6-.5 1.6-1.5 3.5-2.3 5.8-2.1 1.8.1 3.5.7 4 2.5.4 1.4.3 2.9.4 4.4-.3 0-.4-.1-.5-.2-2.4-2-5.1-2.4-8-1.7-2.7.7-4.4 2.8-4.6 5.5-.2 3.1 1.2 5.4 3.9 6.5 1.7.7 3.6.7 5.4.3 1.4-.3 2-1.1 4-2.2v1.3h2.8c0-4 .1-8.9 0-13.5 0-2.9-1.7-4.7-4.5-5.3zm1.4 12.6c-.1.3 0 .6 0 .9 0 2.1-.5 2.8-2.5 3.6-1.4.5-2.9.7-4.4.2-1.7-.5-2.9-2-2.9-3.7-.1-1.7 1-3.4 2.7-3.9 2.3-.8 4.4-.3 6.3 1.1.6.5 1 1 .8 1.8zm15.6-9.9c2.6-.8 5-.3 6.8 1.9l.3.2c.7-.6 1.3-1.2 2.1-1.9-.3-.3-.4-.5-.6-.8-2.9-3.1-8.6-3.5-12.1-1-4.9 3.6-4.8 10.6-2.4 14.3 2.3 3.5 5.6 4.7 9.5 4.2 2.3-.3 4.2-1.4 5.7-3.3-.7-.6-1.4-1.2-2.1-1.9-.2.2-.3.3-.4.5-2.7 3-7.2 2.7-9.6-.5-1.4-1.9-1.7-4.1-1.3-6.3.2-2.5 1.5-4.5 4.1-5.4zm20.8 13.6c-.2.1-.3.2-.3.2-.8.6-1.6.7-2.5.4-.9-.4-1-1.2-1.1-2v-11.4c0-.2 0 .2.1-.8h3.8v-3h-4v-5h-3v5.4h-2.6c-.2 0-.5.2-.5.4-.1.7 0 1.2 0 2.2h3.2v12.8c0 1.6.4 3 1.8 3.8 1.5.9 4.4.7 5.7-.4.2-.1.3-.5.3-.6-.3-.6-.6-1.3-.9-2z"></path></g>
            </animated.svg>   
     
            
            <animated.svg
                className='icon three-icon'               
                style={iconAnimation}
                viewBox="0 0 128 128"
                >
                <path d="M23.064 6.845a.966.966 0 00-.902 1.198l20.872 84.48a.966.966 0 001.606.464l62.783-60.399a.966.966 0 00-.401-1.624L23.366 6.882a.966.966 0 00-.302-.037zM24.438 9.2l80.44 23.157-60.37 58.077-20.07-81.234z"></path>
                <path d="M64.9 18.886a.966.966 0 00-.654.27L32.869 49.361a.966.966 0 00.402 1.624l41.803 12.048a.966.966 0 001.205-1.16L65.853 19.62a.966.966 0 00-.954-.734zm-.52 2.822l9.623 39.007-38.589-11.123L64.38 21.708z"></path>
                <path d="M49.327 33.835a.966.966 0 00-.9 1.196l5.176 20.988a.966.966 0 001.608.465l15.587-15.021a.966.966 0 00-.403-1.624L49.63 33.872a.966.966 0 00-.303-.037zm1.374 2.354l17.552 5.043L55.077 53.93l-4.376-17.74z"></path>
                <path d="M44.164 12.869a.966.966 0 00-.655.27L27.922 28.168a.966.966 0 00.402 1.624l20.766 5.967a.966.966 0 001.205-1.16l-5.177-20.994a.966.966 0 00-.954-.735zm-.522 2.825l4.377 17.747-17.554-5.044 13.177-12.703zM85.7 24.838a.966.966 0 00-.653.27L69.457 40.13a.966.966 0 00.405 1.622l20.764 5.967a.966.966 0 001.205-1.16l-5.177-20.987a.966.966 0 00-.954-.734zm-.52 2.824l4.377 17.74-17.553-5.044L85.18 27.662zM54.524 54.844a.966.966 0 00-.653.27l-15.59 15.02a.966.966 0 00.405 1.624l20.772 5.967a.966.966 0 001.204-1.16l-5.184-20.987a.966.966 0 00-.954-.734zm-.52 2.823l4.382 17.74-17.558-5.042 13.176-12.698z"></path>
                <path d="M25.956 114.7c-.452 1.041-1.306 1.494-2.118 1.494-1.027 0-1.989-.747-1.989-2.248v-5.32h4.316v-1.371h-4.316v-3.741l-1.522-.108v3.849h-1.644v1.371h1.644v5.32c0 2.377 1.73 3.748 3.533 3.748 1.32 0 2.692-.71 3.46-2.376zm12.76 1.537v-4.107c0-2.542-1.063-5.155-3.698-5.155-1.264 0-2.585.581-3.08 1.479v-4.94l-1.516-.108v14.008h1.515v-7.338c.453-.897 1.092-1.58 2.334-1.58 1.795 0 2.822 1.451 2.822 3.246v5.672h1.73c-.108-.366-.108-.79-.108-1.177zm11.717-7.317l.94-1.472c-1.148-.452-1.536-.473-1.923-.473-.79 0-2.391.129-3.102 1.479 0-.237.15-1.006.28-1.2h-3.741v1.135l2.075.108v7.675h-3.145v1.242h7.74c-.107-.366-.107-.79-.107-1.177v-.065h-3.016v-5.837c.345-1.522 2.269-2.355 4-1.415zm7.697-1.945c-2.908 0-4.43 1.902-4.509 5.176v.92c0 2.692 1.924 4.623 4.595 4.623 1.501 0 2.887-.646 3.87-1.716l-.897-1.112c-1.156 1.112-2.118 1.436-3.016 1.436-1.795 0-3.058-1.329-3.058-3.232l7.252-.043.021-.876c.13-3.295-1.371-5.176-4.258-5.176zm2.657 4.724h-5.65c.085-2.09.875-3.396 2.842-3.396 1.968 0 2.908 1.22 2.808 3.396zm9.104-4.724c-2.908 0-4.43 1.902-4.516 5.176v.92c0 2.692 1.924 4.623 4.602 4.623a5.265 5.265 0 003.87-1.716l-.897-1.112c-1.156 1.112-2.118 1.436-3.016 1.436-1.795 0-3.058-1.329-3.058-3.232l7.252-.043.021-.876c.13-3.295-1.371-5.176-4.258-5.176zm2.65 4.724h-5.644c.086-2.09.876-3.396 2.843-3.396 1.968 0 2.908 1.22 2.8 3.396zm7.912 4.861c0 .725.41 1.134 1.135 1.134.703 0 1.113-.409 1.113-1.134 0-.71-.41-1.113-1.113-1.113-.704 0-1.135.402-1.135 1.113zm14.69-11.1c.704 0 1.114-.388 1.114-1.135 0-.71-.41-1.091-1.113-1.091-.704 0-1.113.38-1.113 1.091 0 .747.387 1.135 1.113 1.135zm-2.713 1.795v1.134l2.096.108v8.917c0 1.515-.962 2.248-1.989 2.248-.84 0-1.694-.453-2.14-1.48l-1.35.597c.769 1.694 2.14 2.376 3.469 2.376 1.795 0 3.525-1.35 3.525-3.74l.022-10.16zm13.276 4.344c-1.946-.367-2.844-.84-2.844-1.652 0-.919 1.113-1.58 2.671-1.58 1.113 0 1.86.338 2.693 1.221l.962-.962c-.747-1.07-2.111-1.651-3.827-1.651-2.348 0-3.935 1.199-3.935 3.015 0 1.587 1.22 2.506 4.15 3.102 1.774.345 2.312.66 2.312 1.35 0 1.005-1.22 1.881-2.613 1.881-1.192 0-2.262-.66-3.246-1.816l-1.026 1.048c1.048 1.386 2.434 2.14 4.25 2.14 2.463 0 4.064-1.372 4.064-3.275 0-1.543-1.048-2.333-3.611-2.821zm0 0"></path>
            </animated.svg>  
      </div>
    </div>
  );
};

export default Skills;
