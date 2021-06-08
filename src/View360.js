import React, {useRef, useState} from 'react';
import Tridi from "react-tridi";

function View360(props)
{
    const images = [
        'https://www.microdinc.com/wp-content/uploads/2019/03/416C-SW0000.jpg',
        'https://www.microdinc.com/wp-content/uploads/2019/03/416C-SW0001.jpg',
        'https://www.microdinc.com/wp-content/uploads/2019/03/416C-SW0002.jpg',
        'https://www.microdinc.com/wp-content/uploads/2019/03/416C-SW0003.jpg',
        'https://www.microdinc.com/wp-content/uploads/2019/03/416C-SW0004.jpg',
        'https://www.microdinc.com/wp-content/uploads/2019/03/416C-SW0005.jpg',
        'https://www.microdinc.com/wp-content/uploads/2019/03/416C-SW0006.jpg',
        'https://www.microdinc.com/wp-content/uploads/2019/03/416C-SW0007.jpg',
        'https://www.microdinc.com/wp-content/uploads/2019/03/416C-SW0008.jpg',
        'https://www.microdinc.com/wp-content/uploads/2019/03/416C-SW0009.jpg',
        'https://www.microdinc.com/wp-content/uploads/2019/03/416C-SW0010.jpg',
        'https://www.microdinc.com/wp-content/uploads/2019/03/416C-SW0011.jpg',
        'https://www.microdinc.com/wp-content/uploads/2019/03/416C-SW0012.jpg',
        'https://www.microdinc.com/wp-content/uploads/2019/03/416C-SW0013.jpg',
        'https://www.microdinc.com/wp-content/uploads/2019/03/416C-SW0014.jpg',
        'https://www.microdinc.com/wp-content/uploads/2019/03/416C-SW0015.jpg',
        'https://www.microdinc.com/wp-content/uploads/2019/03/416C-SW0016.jpg',
        'https://www.microdinc.com/wp-content/uploads/2019/03/416C-SW0017.jpg',
        'https://www.microdinc.com/wp-content/uploads/2019/03/416C-SW0018.jpg',
    ];
    const [isAutoPlayRunning, setIsAutoPlayRunning] = useState(false);
    const tridiRef = useRef(null);
    return (
        <div style={{
            width: '500px',
            textAlign: 'center'
        }}>
            <Tridi
                ref={tridiRef}
                images={images}
                count={images.length} />
            <button onClick={() => tridiRef.current.prev()}>Prev</button>
            <button onClick={() => tridiRef.current.next()}>Next</button>
            <button onClick={() => {
                tridiRef.current.toggleAutoplay(!isAutoPlayRunning);
                setIsAutoPlayRunning(!isAutoPlayRunning)
            }}>
                {isAutoPlayRunning ? 'Pause' : 'Autoplay'}
            </button>
        </div>
    );
}

export default View360;
