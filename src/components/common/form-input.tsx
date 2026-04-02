import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";

export default function FormInput<T extends FieldValues>(
    { form, name, label, placeholder, type = "text" }: {
        form: UseFormReturn<T>;
        name: Path<T>;
        label: string;
        placeholder?: string;
        type?: string;
    }
) {
    return (
    <FieldGroup>
        <Controller
            name={name}
            control={form.control}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={name}>{label}</FieldLabel>
                     {type === "textarea" ? (
                        <Textarea
                            {...field}
                            id={name}
                            typeof={type}
                            placeholder={placeholder}
                            autoComplete="off"
                        />
                    ) : (
                        <Input
                            {...field}
                            id={name}   
                            type={type}
                            placeholder={placeholder}
                            autoComplete="off"
                        />
                    )}
                    {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} className="text-xs"/>
                    )}
                </Field>
            )}
        />
    </FieldGroup>
    )
}