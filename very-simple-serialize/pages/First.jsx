import UintNumberType from '../components/UintNumberType'
import BooleanType from '../components/BooleanType'

export default function First() {

    return (
        <div>FEE
            <UintNumberType
            value={4}
            offset={0}
            uintType={"Uint8"} />
        </div>
    )

}