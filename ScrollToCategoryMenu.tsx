import { addPropertyControls, ControlType } from "framer"
import { useEffect, useState } from "react"

/**
 * @framerSupportedLayoutWidth auto
 * @framerSupportedLayoutHeight auto
 */
export default function ScrollToCategoryMenu(props) {
    const {
        categories = [],
        offset = 50,
        activeColor = "#007aff",
        inactiveColor = "#ccc",
        direction = "row",
        gap = 8,
        paddingPerSide,
        paddingTop = 0,
        paddingRight = 0,
        paddingBottom = 0,
        paddingLeft = 0,
        padding = 0,
        borderRadiusPerCorner,
        borderRadiusTopLeft = 4,
        borderRadiusTopRight = 4,
        borderRadiusBottomRight = 4,
        borderRadiusBottomLeft = 4,
        borderRadius = 4,
        font,
        style,
    } = props

    const [activeId, setActiveId] = useState("")

    useEffect(() => {
        const handleScroll = () => {
            let current = ""
            for (const category of categories) {
                const el = document.getElementById(category.id)
                if (el) {
                    const rect = el.getBoundingClientRect()
                    const top = rect.top + window.scrollY
                    if (window.scrollY + offset >= top) {
                        current = category.id
                    }
                }
            }
            if (current) setActiveId(current)
        }

        window.addEventListener("scroll", handleScroll)
        handleScroll() // Initial call to set active on mount

        return () => window.removeEventListener("scroll", handleScroll)
    }, [categories, offset])

    const scrollTo = (id) => {
        const el = document.getElementById(id)
        if (el) {
            const rect = el.getBoundingClientRect()
            const scrollTop = window.scrollY + rect.top - offset

            window.scrollTo({
                top: scrollTop,
                behavior: "smooth",
            })
        }
    }

    const getPadding = () => {
        if (paddingPerSide) {
            return `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`
        }
        return `${padding}px`
    }

    const getBorderRadius = () => {
        if (borderRadiusPerCorner) {
            return `${borderRadiusTopLeft}px ${borderRadiusTopRight}px ${borderRadiusBottomRight}px ${borderRadiusBottomLeft}px`
        }
        return `${borderRadius}px`
    }

    return (
        <div
            style={{
                display: "flex",
                flexDirection: direction,
                gap: gap,
                padding: getPadding(),
                ...style,
            }}
        >
            {categories.map((category) => (
                <button
                    key={category.id}
                    onClick={() => scrollTo(category.id)}
                    style={{
                        padding: "8px 12px",
                        border: "none",
                        borderRadius: getBorderRadius(),
                        backgroundColor:
                            activeId === category.id
                                ? activeColor
                                : inactiveColor,
                        color: "#fff",
                        cursor: "pointer",
                        transition: "background-color 0.2s ease",
                        ...font,
                    }}
                >
                    {category.name}
                </button>
            ))}
        </div>
    )
}

ScrollToCategoryMenu.displayName = "Scroll To Category Menu"

addPropertyControls(ScrollToCategoryMenu, {
    categories: {
        type: ControlType.Array,
        title: "Categories",
        propertyControl: {
            type: ControlType.Object,
            controls: {
                id: { type: ControlType.String, title: "ID" },
                name: { type: ControlType.String, title: "Label" },
            },
        },
    },
    offset: {
        type: ControlType.Number,
        title: "Offset Y",
        defaultValue: 50,
        displayStepper: true,
    },
    direction: {
        type: ControlType.Enum,
        title: "Direction",
        options: ["row", "column"],
        optionTitles: ["Horizontal", "Vertical"],
        defaultValue: "row",
    },
    gap: {
        type: ControlType.Number,
        title: "Gap",
        defaultValue: 8,
        displayStepper: true,
    },
    padding: {
        type: ControlType.FusedNumber,
        title: "Padding",
        defaultValue: 0,
        toggleKey: "paddingPerSide",
        toggleTitles: ["All Sides", "Per Side"],
        valueKeys: [
            "paddingTop",
            "paddingRight",
            "paddingBottom",
            "paddingLeft",
        ],
        valueLabels: ["T", "R", "B", "L"],
        min: 0,
    },
    activeColor: {
        type: ControlType.Color,
        title: "Active Color",
        defaultValue: "#007aff",
    },
    inactiveColor: {
        type: ControlType.Color,
        title: "Inactive Color",
        defaultValue: "#ccc",
    },
    font: {
        type: ControlType.Font,
        title: "Font",
        controls: "extended",
        defaultFontType: "sans-serif",
        defaultValue: {
            fontSize: 24,
            lineHeight: 1.2,
            fontFamily: "Host Grotesk, sans-serif",
            fontWeight: 500,
        },
    },
})
