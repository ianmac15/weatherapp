import { useState } from "react";

export function useToggle():[boolean, () => void] {

    const [isToggled, setIsToggled] = useState<boolean>(false)

    const changeToggle = () => {
        setIsToggled(!isToggled)
    }

    return [isToggled, changeToggle]
}