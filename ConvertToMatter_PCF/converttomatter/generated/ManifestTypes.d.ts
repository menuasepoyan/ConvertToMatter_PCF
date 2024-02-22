/*
*This is auto generated from the ControlManifest.Input.xml file
*/

// Define IInputs and IOutputs Type. They should match with ControlManifest.
export interface IInputs {
    Name: ComponentFramework.PropertyTypes.StringProperty;
    buttonType: ComponentFramework.PropertyTypes.EnumProperty<"CompoundButtonCenter" | "CompoundButtonLeft" | "ButtonOnlyIcon" | "NormalButton">;
    buttonSize: ComponentFramework.PropertyTypes.EnumProperty<"Medium" | "Large">;
    showButtonDescription: ComponentFramework.PropertyTypes.EnumProperty<"No" | "Yes">;
    ConvertToMatterButton: ComponentFramework.PropertyTypes.StringProperty;
    EntityRecordId: ComponentFramework.PropertyTypes.StringProperty;
}
export interface IOutputs {
    Name?: string;
}
