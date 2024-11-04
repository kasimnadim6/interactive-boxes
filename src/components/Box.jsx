import PropTypes from 'prop-types';
import { useRef } from 'react';
import { useMemo } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const Box = ({ shape = [] }) => {
  const [selected, setSelected] = useState(new Set());
  const [unloading, setUnloading] = useState(false);
  const timerRef = useRef(null);

  const clickHandler = ({ target }) => {
    const dataIndex = target.getAttribute('data-index');
    const status = target.getAttribute('data-status');

    if (unloading || selected.has(dataIndex) || status === 'hidden') {
      return;
    }
    setSelected((prev) => new Set(prev.add(dataIndex)));
  };

  const findNumberOfBox = useMemo(() => {
    return shape.reduce((acc, row) => {
      row.forEach((item) => {
        acc += item === 1 ? item : 0;
      });
      return acc;
    }, 0);
  }, [shape]);

  useEffect(() => {
    if (selected.size !== findNumberOfBox) return;

    setUnloading(true);
    const keys = Array.from(selected.keys());

    const unloadBox = () => {
      const currentKey = keys.shift();
      if (currentKey) {
        setSelected((prev) => {
          let updated = new Set(prev);
          updated.delete(currentKey);
          return updated;
        });
        timerRef.current = setTimeout(unloadBox, 500);
      } else {
        setUnloading(false);
        clearTimeout(timerRef.current);
      }
    };
    unloadBox();
    return () => {
      clearTimeout(timerRef);
    };
  }, [selected]);

  return (
    <div>
      {shape.map((row, rowIdx) => {
        return (
          <div className="row" key={rowIdx}>
            {row.map((col, colIdx) => {
              const identifier = `${rowIdx}-${colIdx}`;
              const isSelected = selected.has(identifier) && 'selected';
              const status = col === 1 ? 'visible' : 'hidden';
              return (
                <div
                  key={colIdx}
                  data-index={identifier}
                  data-status={status}
                  className={['box', status, isSelected].join(' ')}
                  onClick={clickHandler}
                ></div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Box;

Box.propTypes = {
  shape: PropTypes.array.isRequired,
};
