import UintNumberType from '../components/UintNumberType'
import BooleanType from '../components/BooleanType'

export default function First() {

    return (
        <div className='container'>
            <div className='row'>
            <UintNumberType
            value={1}
            offset={0}
            uintType={"Uint8"} />
            
            <BooleanType
            value={true}
            offset={0} />
        </div>
        </div>
    )

}