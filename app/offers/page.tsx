import { FunctionComponent } from "react";
import { Card } from "../profile/components/Card";

/**
 * Offers Screen component - handles showing all offers
 * @returns FunctionComponent describing the layout of the page
 */
const Offers: FunctionComponent = () => {
    return (
        <>
            <div className="grid grids-cols-3 space-y-8 p5">
                <Card>
                    <h4>Hey</h4>
                </Card>
                <Card>
                    <h4>Hey</h4>
                </Card>
                <Card>
                    <h4>Hey</h4>
                </Card>
            </div>
        </>
    )
}

export default Offers;