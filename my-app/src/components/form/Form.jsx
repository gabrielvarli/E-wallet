import { DropDown } from "./DropDown"; 
import { FormInput } from "./FormInput"; 
import { GradientPicker } from "./GradientPicker"; 
import { Button } from "../Button"; 
import { cardVendors, inputs } from "../../config/config"; 
import { hasDatePassed, blockInvalidChar } from "../../utils/helpers"; 
import { useDispatch, useSelector } from "react-redux"; 
import { setUser } from "../../features/cards/cardsSlice"; 

export const Form = ({
    formData,
    setFormData,
    handleSubmit,
    isDatePassed,
    setIsDatePassed,
}) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.cards); 

    const onChange = (e) => {
        const { name, value, type } = e.target;

        // Check if the date has passed
        if (name === "date" && type === "date") {
            const pickedDate = new Date(value);
            const currentDate = new Date();
            setIsDatePassed(hasDatePassed(pickedDate, currentDate));

            // Uppdatera formData för datum
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        return;  // Avbryt för att undvika ytterligare behandling
        }

        // Handle text fields and block invalid characters for numeric fields
        if (type === "text" /*|| type === "date"*/) { // Include date type
            const inputConfig = inputs.find((input) => input.name === name);
            const newValue = inputConfig?.numericOnly ? blockInvalidChar(value) : value;

            // Block invalid characters for cardNumber and cvc
            if (name === "card_number" || name === "cvc") {
                const isNumeric = /^[0-9]*$/; 
                if (!isNumeric.test(newValue) && newValue !== "") {
                    return; 
                }
            }

            // Update Redux for first name and last name
            if (name === "firstName") {
                dispatch(setUser({ ...user, first: newValue })); 
            }
            if (name === "lastName") {
                dispatch(setUser({ ...user, last: newValue })); 
            }

            // Update formData for cardNumber and cvc
            setFormData((prevData) => ({ ...prevData, [name]: newValue }));
            return;
        }

        // Handle other fields
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    return (
        <div className="w-full py-8 bg-primary-500 shadow-2xl rounded-xl max-w-md bg-gradient-to-t from-transparent-2 to-transparent-0">
            <h2 className="font-bold text-center mt-4 uppercase">Add New Card</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-8 pt-6">
                {/* First Name input */}
                <FormInput
                    label="First Name"
                    name="firstName"
                    value={user.first || formData.firstName || ''} // Use empty string as fallback
                    onChange={onChange}
                    required={true}
                />
                
                {/* Last Name input */}
                <FormInput
                    label="Last Name"
                    name="lastName"
                    value={user.last || formData.lastName || ''} // Use empty string as fallback
                    onChange={onChange}
                    required={true}
                />
                

                {/* Iterate over all inputs from config */}
                {inputs.map((input) => (
                    input.name === "gradient" ? (
                        <GradientPicker
                            key={input.name}
                            {...input}
                            formData={formData}
                            onChange={onChange}
                        />
                    ) : (
                        <FormInput
                            key={input.id}
                            {...input}
                            value={formData[input.name] || ''} // Ensure value is defined
                            onChange={onChange}
                            valid={input.name === "date" ? !isDatePassed : undefined}
                            required={true}
                        />
                        
                    )
                ))}

                {/* Dropdown for selecting card vendor */}
                <DropDown
                    label="Card Vendor"
                    name="vendor"
                    value={formData.vendor || ''} // Use empty string as fallback
                    optionsObj={{ filter: "vendor", arr: cardVendors }}
                    isReq={true}
                    onChange={onChange}
                />
                
                {/* Save button */}
                <div className="self-center">
                    <Button type="submit" variant="primary">
                        Add Card
                    </Button>
                </div>
            </form>
        </div>
    );
};