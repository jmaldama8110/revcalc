import './RangeSlider.css'

export const RangeSlider = ({min, max,value, step, onUpdateHandler}) => {

  return (
    <div className='slidercontainer'>
        <input
        type='range'
        className='slider'
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onUpdateHandler}
        ></input>
    </div>
  )
}
