import React, { useState } from 'react';
import './Carousel.scss';
import c from 'classnames';

interface Props {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
}

const Carousel: React.FC<Props> = ({
  images,
  itemWidth,
  frameSize,
  step,
  animationDuration,
}) => {
  const [translate, setTranslate] = useState(0);
  const [toDisplay, setToDisplay] = useState(images.length * itemWidth);
  const wide = step * itemWidth;
  const width = toDisplay;

  const RightTranslation = () => {
    if (translate > -(width - wide) && toDisplay - wide >= wide) {
      setTranslate(prev => prev - wide);
      setToDisplay(prev => prev - wide);
    } else if (toDisplay - wide < wide && toDisplay !== 0) {
      setTranslate(prev => prev - (toDisplay - wide));
      setToDisplay(0);
    }
  };

  const LeftTranslation = () => {
    if (translate <= -wide) {
      setTranslate(prev => prev + wide);
      setToDisplay(prev => prev + wide);
    } else if (toDisplay + wide + wide > width && toDisplay !== width) {
      setTranslate(prev => prev + (width - toDisplay - wide));
      setToDisplay(width);
    }
  };

  return (
    <>
      <div className="Wrapper" style={{ width: `${frameSize * itemWidth}px` }}>
        <div className="Carousel">
          <ul
            className="Carousel__list"
            style={{
              transform: `translateX(${translate}px)`,
              transition: `transform ${animationDuration} ease-in-out`,
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            {images.map((image, index) => (
              <li key={index}>
                <img
                  src={image}
                  alt={(index + 1).toString()}
                  width={itemWidth}
                  height={itemWidth}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="buttons">
          <button
            type="button"
            className={c('button button--next', {
              disabled: toDisplay === 1300,
            })}
            onClick={LeftTranslation}
          >
            &lt; Prev
          </button>

          <button
            type="button"
            className={c('button button--next', {
              disabled: toDisplay === 0,
            })}
            onClick={RightTranslation}
            data-cy="next"
          >
            Next &gt;
          </button>
        </div>
      </div>
    </>
  );
};

export default Carousel;
