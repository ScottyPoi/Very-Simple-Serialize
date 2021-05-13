import UintNType from '../components/UintNType'
import BooleanType from '../components/BooleanType'
import BigIntNumberType from '../components/BigIntNumberType';

export default function First() {

    return (
        <div className='container'>
            <div className='row'>
            <UintNType
            value={256}
            offset={0}
            uintType={"Uint256"} />
            
            <BooleanType
            value={true}
            offset={0} />

        </div>
        </div>
    )

}