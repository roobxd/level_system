import { Card } from "@/app/profile/components/Card";
import { Offer as PrismaOffer} from "@prisma/client";
import { FunctionComponent } from "react";

// Custom type for offer property
interface OfferProps {
    offer?: PrismaOffer
}


/**
 * Offer component to showcase data
 * @param param0 
 * @returns FunctionComponent
 */
const Offer: FunctionComponent<OfferProps> = ({offer}) => {
    return (
        <Card loading={offer===undefined}>
            {
                offer && (
                    <>
                    </>
                )
            }
 
        </Card>
    )
}

export default Offer;