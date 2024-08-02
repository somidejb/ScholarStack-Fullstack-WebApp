import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ILanguage } from "@/lib/mongodb/database/models/language.model"
import { useEffect, useState } from "react"
import { getAllLanguages } from "@/lib/actions/language.actions"

type DropdownProps = {
    value?: string
    onChangeHandler?: () => void
}

// Function to convert a string to title case
const toTitleCase = (str: string) => {
    return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase());
}

const LanguageDropdown = ({ value, onChangeHandler }: DropdownProps) => {
    const [languages, setLanguages] = useState<ILanguage[]>([])

    useEffect(() => {
        const getLanguages = async () => {
            const languageList = await getAllLanguages();

            if (languageList) {
                // Convert language names to title case
                const titleCasedLanguages = languageList.map((language: ILanguage) => ({
                    ...language,
                    name: toTitleCase(language.name)
                }));
                setLanguages(titleCasedLanguages);
            }
        }

        getLanguages();
    }, [])

    return (
        <Select onValueChange={onChangeHandler} defaultValue={value}>
            <SelectTrigger className="select-field">
                <SelectValue placeholder="Select a Language" />
            </SelectTrigger>
            <SelectContent>
                {languages.length > 0 && languages.map((language) => (
                    <SelectItem key={language._id} value={language._id} className="select-item p-regular-14">
                        {language.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}

export default LanguageDropdown
