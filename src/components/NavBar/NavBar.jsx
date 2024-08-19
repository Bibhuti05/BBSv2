import React, {useState, useEffect, useRef} from 'react';
import styles from './navBar.module.css';
import { GoPersonAdd } from "react-icons/go";


const SegmentedControl = ({
    name,
    segments,
    callback,
    defaultIndex = 0,
    controlRef
  }) => {
    const [activeIndex, setActiveIndex] = useState(defaultIndex);
    const componentReady = useRef();
  
    // Determine when the component is "ready"
    useEffect(() => {
      componentReady.current = true;
    }, []);
  
    useEffect(() => {
      const activeSegmentRef = segments[activeIndex].ref;
      const { offsetWidth, offsetLeft } = activeSegmentRef.current;
      const { style } = controlRef.current;
  
      style.setProperty("--highlight-width", `${offsetWidth}px`);
      style.setProperty("--highlight-x-pos", `${offsetLeft}px`);
    }, [activeIndex, callback, controlRef, segments]);
  
    const onInputChange = (value, index) => {
      setActiveIndex(index);
      callback(value, index);
    };
  
    return (
        <div className={styles['controls-container']} ref={controlRef}>
          <div className={`${styles.controls} ${componentReady.current ? styles.ready : styles.idle}`}>
            {segments?.map((item, i) => (
              <div
                key={item.value}
                className={`${styles.segment} ${i === activeIndex ? styles.active : styles.inactive}`}
                ref={item.ref}
              >
                <input
                  type="radio"
                  value={item.value}
                  id={item.label}
                  name={name}
                  onChange={() => onInputChange(item.value, i)}
                  checked={i === activeIndex}
                />
                <label htmlFor={item.label}>{item.label}</label>
              </div>
            ))}
          </div>
        </div>
      );
    };
  

export default function NavBar() {
    const [selectedValue1, setSelectedValue1] = useState("complete");
    const [selectedValue2, setSelectedValue2] = useState("complete");
  return (
    <div className={styles.container}>
      <div className={styles.avatarContainer}>
      <GoPersonAdd color='white' style={{
        height:'40%',
        width:'40%',
        inset:'0',
        margin:'auto',
        position:'absolute'
      
      }} />
      </div>

      <SegmentedControl
        name="group-2"
        callback={(val) => setSelectedValue2(val)}
        controlRef={useRef()}
        defaultIndex={1}
        segments={[
          {
            label: "Skills",
            value: "first",
            ref: useRef()
          },
          {
            label: "Home",
            value: "second",
            ref: useRef()
          },
          {
            label: "Portfolio",
            value: "third",
            ref: useRef()
          }
        ]}
      />
            <div className={styles.avatarContainer}>
      <GoPersonAdd color='white' style={{
        height:'40%',
        width:'40%',
        inset:'0',
        margin:'auto',
        position:'absolute'
      
      }} />
      </div>
    </div>
  )
}
