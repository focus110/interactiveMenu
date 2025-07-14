import { addPropertyControls, ControlType } from "framer"
import { useEffect, useState } from "react"

export default function ScrollToCategoryMenu(props) {
    const {
        categories = [],
        offset = 50,
        offsetPercentage = 0,
        maxOffset = 400,
        activeColor = "#007aff",
        inactiveColor = "#ccc",
        activeTextColor = "#ffffff",
        inactiveTextColor = "#000000",
        direction = "row",
        gap = 8,
        paddingPerSide,
        paddingTop = 0,
        paddingRight = 0,
        paddingBottom = 0,
        paddingLeft = 0,
        padding = 0,
        buttonPaddingPerSide,
        buttonPaddingTop = 8,
        buttonPaddingRight = 12,
        buttonPaddingBottom = 8,
        buttonPaddingLeft = 12,
        buttonPadding = 8,
        buttonRadiusPerCorner,
        buttonRadiusTopLeft = 4,
        buttonRadiusTopRight = 4,
        buttonRadiusBottomRight = 4,
        buttonRadiusBottomLeft = 4,
        buttonRadius = 4,
        font,
        style,
    } = props

    const [activeId, setActiveId] = useState("")

    const calculateOffset = () => {
        if (offsetPercentage > 0) {
            const dynamicOffset = window.innerHeight * (offsetPercentage / 100)
            return Math.min(dynamicOffset, maxOffset)
        }
        return offset
    }

    const handleScroll = () => {
        const currentOffset = calculateOffset()
        let current = categories[0]?.id || ""

        for (let i = 0; i < categories.length; i++) {
            const el = document.getElementById(categories[i].id)
            if (el) {
                const rect = el.getBoundingClientRect()
                const top = rect.top + window.scrollY

                const nextCategory = categories[i + 1]
                const nextEl = nextCategory
                    ? document.getElementById(nextCategory.id)
                    : null
                const nextTop = nextEl
                    ? nextEl.getBoundingClientRect().top + window.scrollY
                    : Infinity

                if (
                    window.scrollY + currentOffset >= top &&
                    window.scrollY + currentOffset < nextTop
                ) {
                    current = categories[i].id
                    break
                }
            }
        }

        setActiveId(current)
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
        handleScroll() // initial

        return () => window.removeEventListener("scroll", handleScroll)
    }, [categories, offset, offsetPercentage, maxOffset])

    const scrollTo = (id: string) => {
        const el = document.getElementById(id)
        if (el) {
            const rect = el.getBoundingClientRect()
            const adjustment = 30 // 👈 Hier zusätzliche Pixel „vorgaukeln“

            const scrollTop =
                window.scrollY + rect.top - calculateOffset() + adjustment

            window.scrollTo({
                top: scrollTop,
                behavior: "smooth",
            })

            // Sofort aktiv für UI-Feedback
            setActiveId(id)

            // Scroll-Handler nach kurzer Zeit erneut aufrufen
            setTimeout(() => handleScroll(), 300)
        }
    }

    const getPadding = () =>
        paddingPerSide
            ? `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`
            : `${padding}px`

    const getButtonPadding = () =>
        buttonPaddingPerSide
            ? `${buttonPaddingTop}px ${buttonPaddingRight}px ${buttonPaddingBottom}px ${buttonPaddingLeft}px`
            : `${buttonPadding}px`

    const getButtonRadius = () =>
        buttonRadiusPerCorner
            ? `${buttonRadiusTopLeft}px ${buttonRadiusTopRight}px ${buttonRadiusBottomRight}px ${buttonRadiusBottomLeft}px`
            : `${buttonRadius}px`

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
                        padding: getButtonPadding(),
                        border: "none",
                        borderRadius: getButtonRadius(),
                        backgroundColor:
                            activeId === category.id
                                ? activeColor
                                : inactiveColor,
                        color:
                            activeId === category.id
                                ? activeTextColor
                                : inactiveTextColor,
                        cursor: "pointer",
                        transition:
                            "background-color 0.2s ease, color 0.2s ease",
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
        title: "Offset (px)",
        defaultValue: 50,
        displayStepper: true,
    },
    offsetPercentage: {
        type: ControlType.Number,
        title: "Offset (% vh)",
        defaultValue: 0,
        min: 0,
        max: 100,
        displayStepper: true,
    },
    maxOffset: {
        type: ControlType.Number,
        title: "Max Offset (px)",
        defaultValue: 400,
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
    buttonPadding: {
        type: ControlType.FusedNumber,
        title: "Button Padding",
        defaultValue: 8,
        toggleKey: "buttonPaddingPerSide",
        toggleTitles: ["All Sides", "Per Side"],
        valueKeys: [
            "buttonPaddingTop",
            "buttonPaddingRight",
            "buttonPaddingBottom",
            "buttonPaddingLeft",
        ],
        valueLabels: ["T", "R", "B", "L"],
        min: 0,
    },
    buttonRadius: {
        type: ControlType.FusedNumber,
        title: "Button Radius",
        defaultValue: 4,
        toggleKey: "buttonRadiusPerCorner",
        toggleTitles: ["All Corners", "Per Corner"],
        valueKeys: [
            "buttonRadiusTopLeft",
            "buttonRadiusTopRight",
            "buttonRadiusBottomRight",
            "buttonRadiusBottomLeft",
        ],
        valueLabels: ["TL", "TR", "BR", "BL"],
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
    activeTextColor: {
        type: ControlType.Color,
        title: "Active Text Color",
        defaultValue: "#ffffff",
    },
    inactiveTextColor: {
        type: ControlType.Color,
        title: "Inactive Text Color",
        defaultValue: "#000000",
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
