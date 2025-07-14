import React, { useRef, useState, useEffect } from "react"
import { addPropertyControls, ControlType } from "framer"
import { motion } from "framer-motion"

// Default menu data
const defaultMenuData = [
    {
        Slug: "sashimi-sake",
        "Food No.": "80",
        Name: "SAKE",
        Category: "SASHIMI",
        "Category Description (GER)":
            "Frischer roher Fisch in dünnen Scheiben geschnitten.",
        "Category Description (EN)": "Fresh raw fish cut into thin slices.",
        Image: "https://framerusercontent.com/images/FghCYOVqTmpSMnv9HhvCXqjA.png",
        "Image:alt": "sake-sashimi",
        "Food Description (GER)": "Lachs",
        "Food Description (EN)": "Salmon",
        "Price (€)": 12.8,
        "Allergens & Additives": "",
        "Vegetarian (Optional)": false,
        "Spicy (Optional)": false,
        Quantity: "6 Stück",
    },
    {
        Slug: "sashimi-maguro",
        "Food No.": "81",
        Name: "MAGURO",
        Category: "SASHIMI",
        "Category Description (GER)":
            "Frischer roher Fisch in dünnen Scheiben geschnitten.",
        "Category Description (EN)": "Fresh raw fish cut into thin slices.",
        Image: "https://framerusercontent.com/images/v6fpSeFxk1IwCnXIII2ptfgOcQ.png",
        "Image:alt": "maguro-sashimi",
        "Food Description (GER)": "Thunfisch",
        "Food Description (EN)": "Tuna",
        "Price (€)": 14.8,
        "Allergens & Additives": "",
        "Vegetarian (Optional)": false,
        "Spicy (Optional)": false,
        Quantity: "6 Stück",
    },
    {
        Slug: "chirashi-abokado",
        "Food No.": "90",
        Name: "ABOKADO",
        Category: "CHIRASHI BOWL",
        "Category Description (GER)":
            "Sushi Reis & Tamago, Shinko, wählbar mit:",
        "Category Description (EN)":
            "sushi rice & tamago, shinko selectable with:",
        Image: "https://framerusercontent.com/images/FghCYOVqTmpSMnv9HhvCXqjA.png",
        "Image:alt": "abokado-chirashi",
        "Food Description (GER)": "Avokado",
        "Food Description (EN)": "Avocado",
        "Price (€)": 9.8,
        "Allergens & Additives": "A, C, D, F, K",
        "Vegetarian (Optional)": true,
        "Spicy (Optional)": false,
        Quantity: "",
    },
    {
        Slug: "nigiri-maguro",
        "Food No.": "100",
        Name: "MAGURO-2",
        Category: "NIGIRI",
        "Category Description (GER)": "",
        "Category Description (EN)": "",
        Image: "https://framerusercontent.com/images/v6fpSeFxk1IwCnXIII2ptfgOcQ.png",
        "Image:alt": "maguro-nigiri",
        "Food Description (GER)": "Thunfisch",
        "Food Description (EN)": "Tuna",
        "Price (€)": 12.8,
        "Allergens & Additives": "",
        "Vegetarian (Optional)": false,
        "Spicy (Optional)": false,
        Quantity: "2 Stück",
    },
]

/**
 * @framerSupportedLayoutWidth any
 * @framerSupportedLayoutHeight any

 **/

export default function InteractiveMenu(props) {
    // const sentinelRef = useRef<HTMLDivElement>(null)
    const [hoveredItem, setHoveredItem] = useState(null)
    const [selectedItem, setSelectedItem] = useState(null)
    const [isMobile, setIsMobile] = useState(false)
    const [groupedMenu, setGroupedMenu] = useState({})
    const containerRef = useRef<HTMLDivElement>(null)
    const [isPinned, setIsPinned] = useState(false)

    const [loaded, setLoaded] = useState(false)

    const allCategories = Array.from(
        new Set(defaultMenuData.map((item) => item.Category.trim()))
    )

    useEffect(() => {
        const handleScroll = () => {
            const rect = containerRef.current?.getBoundingClientRect()
            if (!rect) return

            const isAtTop = rect.top <= 0
            setIsPinned(isAtTop)
        }

        window.addEventListener("scroll", handleScroll)
        handleScroll() // run once on mount to set correct initial state

        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    // Parse menu data from props or use default
    const menuData = props.menuData || defaultMenuData

    const {
        textColor,
        backgroundColor,
        categoryFont,
        itemNameFont,
        itemColor,
        priceFont,
        priceColor,
        menuColumnPaddingPerSide,
        menuColumnPaddingTop,
        menuColumnPaddingRight,
        menuColumnPaddingLeft,
        menuColumnPadding,
    } = props
    const {
        layout,
        gap,
        alignItems,
        justifyContent,
        paddingPerSide,
        paddingTop,
        paddingRight,
        paddingBottom,
        paddingLeft,
        padding,
    } = props.layoutOptions

    const {
        imageColumnWidth = "relative",
        imageColumnValue = 100,
        imageColumnpinImg = 600,
        menuColumnWidth = "relative",
        menuColumnValue = 100,
        imageColumnMaxWidth,
        menuColumnMaxWidth = 800,
    } = props.columnWidths

    const {
        imageWidth,
        imageHeight,
        imageObjectFit,
        imageObjectPosition,
        imageRadius,
        imageMaxWidth,
        imageMaxHeight,
        imageColumnBackground,
        imageColumnPosition,
        imageColumnTop,
        imageColumnRight,
        imageColumnBottom,
        imageColumnLeft,
        imageColumnZIndex,
        imageHeightType,
        imageHeightViewport,
        imageHeightRelative,
        imageRadiusPerCorner,
        imageTopLeft,
        imageTopRight,
        imageBottomRight,
        imageBottomLeft,
        imageBorderWidth,
        imageBorderPerSide,
        imageBorderTop,
        imageBorderRight,
        imageBorderBottom,
        imageBorderLeft,
        imageBorderStyle,
        imageBorderColor,
        imageShadow,
        imageShadowColor,
        imageShadowBlur,
        imageShadowX,
        imageShadowY,
        imageOpacity,
        imageTransition,
    } = props.imageSettings

    const getPadding = () => {
        if (paddingPerSide) {
            return `${paddingTop || 0}px ${paddingRight || 0}px ${paddingBottom || 0}px ${paddingLeft || 0}px`
        }
        return `${padding || 0}px`
    }

    const getNameDescColPadding = () => {
        const p = props.nameDescCol
        if (!p) return "0px"
        return p.paddingPerSide
            ? `${p.paddingTop || 0}px ${p.paddingRight || 0}px ${p.paddingBottom || 0}px ${p.paddingLeft || 0}px`
            : `${p.padding || 0}px`
    }

    const getNameDescColBorderRadius = () => {
        const p = props.nameDescCol
        if (!p) return "0px"
        return p.borderRadiusPerCorner
            ? `${p.borderTopLeft || 0}px ${p.borderTopRight || 0}px ${p.borderBottomRight || 0}px ${p.borderBottomLeft || 0}px`
            : `${p.borderRadius || 0}px`
    }

    const getNameDescColBorderWidth = () => {
        const p = props.nameDescCol
        if (!p) return "0px"
        return p.borderWidthPerSide
            ? `${p.borderTop || 0}px ${p.borderRight || 0}px ${p.borderBottom || 0}px ${p.borderLeft || 0}px`
            : `${p.borderWidth || 0}px`
    }

    const getColumnWidth = (columnType, widthType, value, maxWidth) => {
        switch (widthType) {
            case "fit-content":
                return { width: "fit-content", maxWidth: `${maxWidth}px` }
            case "relative":
                return { width: `${value}%`, maxWidth: `${maxWidth}px` }
            case "fixed":
                return { width: `${value * 10}px`, maxWidth: `${maxWidth}px` } // multiply by 10 for better range
            case "fill":
                return { width: "100%", flex: "1 1 0" }
            default:
                return { width: "100%", maxWidth: `${maxWidth}px` }
        }
    }

    const getCategorySectionPadding = () => {
        const layout = props.categorySectionLayout
        if (!layout) return "0px"
        return layout.paddingPerSide
            ? `${layout.paddingTop || 0}px ${layout.paddingRight || 0}px ${layout.paddingBottom || 0}px ${layout.paddingLeft || 0}px`
            : `${layout.padding || 0}px`
    }

    const getCategorySectionBorderWidth = () => {
        const layout = props.categorySectionLayout
        if (!layout) return "0px"
        return layout.borderWidthPerSide
            ? `${layout.borderTop || 0}px ${layout.borderRight || 0}px ${layout.borderBottom || 0}px ${layout.borderLeft || 0}px`
            : `${layout.borderWidth || 0}px`
    }

    const getCategorySectionBorderRadius = () => {
        const layout = props.categorySectionLayout
        if (!layout) return "0px"
        return layout.borderRadiusPerCorner
            ? `${layout.borderTopLeft || 0}px ${layout.borderTopRight || 0}px ${layout.borderBottomRight || 0}px ${layout.borderBottomLeft || 0}px`
            : `${layout.borderRadius || 0}px`
    }

    const getMenuColumnPadding = () => {
        if (menuColumnPaddingPerSide) {
            return `${menuColumnPaddingTop}px ${menuColumnPaddingRight}px ${props.menuColumnPaddingBottom}px ${menuColumnPaddingLeft}px`
        }
        return `${menuColumnPadding}px`
    }

    const getImageColumnPadding = () => {
        const { imageColumnSettings } = props
        if (!imageColumnSettings) return "0px"

        if (imageColumnSettings.imageColumnPaddingPerSide) {
            return `${imageColumnSettings.imageColumnPaddingTop}px ${imageColumnSettings.imageColumnPaddingRight}px ${imageColumnSettings.imageColumnPaddingBottom}px ${imageColumnSettings.imageColumnPaddingLeft}px`
        }
        return `${imageColumnSettings.imageColumnPadding}px`
    }

    const getImageColumnBorderWidth = () => {
        const { imageColumnSettings } = props
        if (!imageColumnSettings) return "0px"

        if (imageColumnSettings.imageColumnBorderPerSide) {
            return `${imageColumnSettings.imageColumnBorderTop}px ${imageColumnSettings.imageColumnBorderRight}px ${imageColumnSettings.imageColumnBorderBottom}px ${imageColumnSettings.imageColumnBorderLeft}px`
        }
        return `${imageColumnSettings.imageColumnBorderWidth}px`
    }

    const getImageColumnBorderRadius = () => {
        const { imageColumnSettings } = props
        if (!imageColumnSettings) return "0px"

        if (imageColumnSettings.imageColumnRadiusPerCorner) {
            return `${imageColumnSettings.imageColumnTopLeft}px ${imageColumnSettings.imageColumnTopRight}px ${imageColumnSettings.imageColumnBottomRight}px ${imageColumnSettings.imageColumnBottomLeft}px`
        }
        return `${imageColumnSettings.imageColumnBorderRadius}px`
    }

    const getCategoryHeaderPadding = () => {
        const layout = props.categoryHeaderBox
        if (!layout) return "0px"
        return layout.paddingPerSide
            ? `${layout.paddingTop || 0}px ${layout.paddingRight || 0}px ${layout.paddingBottom || 0}px ${layout.paddingLeft || 0}px`
            : `${layout.padding || 0}px`
    }

    const getCategoryHeaderBorderWidth = () => {
        const layout = props.categoryHeaderBox
        if (!layout) return "0px"
        return layout.borderWidthPerSide
            ? `${layout.borderTop || 0}px ${layout.borderRight || 0}px ${layout.borderBottom || 0}px ${layout.borderLeft || 0}px`
            : `${layout.borderWidth || 0}px`
    }

    const getCategoryHeaderBorderRadius = () => {
        const layout = props.categoryHeaderBox
        if (!layout) return "0px"
        return layout.borderRadiusPerCorner
            ? `${layout.borderTopLeft || 0}px ${layout.borderTopRight || 0}px ${layout.borderBottomRight || 0}px ${layout.borderBottomLeft || 0}px`
            : `${layout.borderRadius || 0}px`
    }

    const getCategoryDescriptionPadding = () => {
        const layout = props.categoryDescriptionLayout
        if (!layout) return "0px"
        return layout.paddingPerSide
            ? `${layout.paddingTop || 0}px ${layout.paddingRight || 0}px ${layout.paddingBottom || 0}px ${layout.paddingLeft || 0}px`
            : `${layout.padding || 0}px`
    }

    const getItemWrapperPadding = () => {
        const layout = props.itemWrapperLayout
        if (!layout) return "0px"
        return layout.paddingPerSide
            ? `${layout.paddingTop || 0}px ${layout.paddingRight || 0}px ${layout.paddingBottom || 0}px ${layout.paddingLeft || 0}px`
            : `${layout.padding || 0}px`
    }

    const getItemWrapperBorderWidth = () => {
        const layout = props.itemWrapperLayout
        if (!layout) return "0px"
        return layout.borderWidthPerSide
            ? `${layout.borderTop || 0}px ${layout.borderRight || 0}px ${layout.borderBottom || 0}px ${layout.borderLeft || 0}px`
            : `${layout.borderWidth || 0}px`
    }

    const getItemWrapperBorderRadius = () => {
        const layout = props.itemWrapperLayout
        if (!layout) return "0px"
        return layout.borderRadiusPerCorner
            ? `${layout.borderTopLeft || 0}px ${layout.borderTopRight || 0}px ${layout.borderBottomRight || 0}px ${layout.borderBottomLeft || 0}px`
            : `${layout.borderRadius || 0}px`
    }

    const getMenuItemsPadding = () => {
        const layout = props.menuItemsLayout
        if (!layout) return "0px"
        return layout.paddingPerSide
            ? `${layout.paddingTop || 0}px ${layout.paddingRight || 0}px ${layout.paddingBottom || 0}px ${layout.paddingLeft || 0}px`
            : `${layout.padding || 0}px`
    }

    const getMenuItemsBorderWidth = () => {
        const layout = props.menuItemsLayout
        if (!layout) return "0px"
        return layout.borderWidthPerSide
            ? `${layout.borderTop || 0}px ${layout.borderRight || 0}px ${layout.borderBottom || 0}px ${layout.borderLeft || 0}px`
            : `${layout.borderWidth || 0}px`
    }

    const getMenuItemsBorderRadius = () => {
        const layout = props.menuItemsLayout
        if (!layout) return "0px"
        return layout.borderRadiusPerCorner
            ? `${layout.borderTopLeft}px ${layout.borderTopRight}px ${layout.borderBottomRight}px ${layout.borderBottomLeft}px`
            : `${layout.borderRadius}px`
    }

    const getPinnedContainerPadding = () => {
        const p = props.pinnedContainerStyles
        if (!p) return "0px"
        return p.paddingPerSide
            ? `${p.paddingTop || 0}px ${p.paddingRight || 0}px ${p.paddingBottom || 0}px ${p.paddingLeft || 0}px`
            : `${p.padding || 0}px`
    }
    const getPinnedContainerBorderRadius = () => {
        const p = props.pinnedContainerStyles
        if (!p) return "0px"
        return p.borderRadiusPerCorner
            ? `${p.borderTopLeft || 0}px ${p.borderTopRight || 0}px ${p.borderBottomRight || 0}px ${p.borderBottomLeft || 0}px`
            : `${p.borderRadius || 0}px`
    }
    const getPinnedContainerBorderWidth = () => {
        const p = props.pinnedContainerStyles
        if (!p) return "0px"
        return p.borderWidthPerSide
            ? `${p.borderTop || 0}px ${p.borderRight || 0}px ${p.borderBottom || 0}px ${p.borderLeft || 0}px`
            : `${p.borderWidth || 0}px`
    }

    const getContainerBorderWidth = () => {
        const base = props.layoutOptions
        if (!base) return "0px"

        return base.borderWidthPerSide
            ? `${base.borderTop || 0}px ${base.borderRight || 0}px ${base.borderBottom || 0}px ${base.borderLeft || 0}px`
            : `${base.borderWidth || 0}px`
    }
    const getContainerBorderRadius = () => {
        const base = props.layoutOptions
        if (!base) return "0px"

        return base.borderRadiusPerCorner
            ? `${base.borderTopLeft || 0}px ${base.borderTopRight || 0}px ${base.borderBottomRight || 0}px ${base.borderBottomLeft || 0}px`
            : `${base.borderRadius || 0}px`
    }

    const paddingDesc = props.descCol.paddingPerSide
        ? `${props.descCol.paddingTop}px ${props.descCol.paddingRight}px ${props.descCol.paddingBottom}px ${props.descCol.paddingLeft}px`
        : `${props.descCol.paddingTop}px`

    const isPinnedActive = isPinned && props.enablePinnedImageStyles
    const pinnedContainer = props.pinnedContainerStyles
    const containerBase = props.layoutOptions

    const containerStyle = {
        width: "100%",
        // minHeight: "100vh",
        display: containerBase.display,
        gap: `${containerBase.gap}px`,
        flexDirection: props.layoutOptions?.flexDirection,
        justifyContent: containerBase.justifyContent,
        alignItems: containerBase.alignItems,
        fontFamily: "Host Grotesk, sans-serif",
        position:
            isPinnedActive && pinnedContainer.position !== undefined
                ? pinnedContainer.position
                : containerBase.position,
        top:
            isPinnedActive && pinnedContainer.top !== undefined
                ? pinnedContainer.top
                : containerBase.top,
        right:
            isPinnedActive && pinnedContainer.right !== undefined
                ? pinnedContainer.right
                : containerBase.right,
        bottom:
            isPinnedActive && pinnedContainer.bottom !== undefined
                ? pinnedContainer.bottom
                : containerBase.bottom,
        left:
            isPinnedActive && pinnedContainer.left !== undefined
                ? pinnedContainer.left
                : containerBase.left,
        zIndex:
            isPinnedActive && pinnedContainer.zIndex !== undefined
                ? pinnedContainer.zIndex
                : containerBase.zIndex,
        backgroundColor:
            isPinnedActive && pinnedContainer.backgroundColor !== undefined
                ? pinnedContainer.backgroundColor
                : containerBase.backgroundColor,

        padding:
            isPinnedActive && pinnedContainer.padding !== undefined
                ? getPinnedContainerPadding()
                : getPadding(),

        borderRadius:
            isPinnedActive && pinnedContainer.borderRadius !== undefined
                ? getPinnedContainerBorderRadius()
                : getContainerBorderRadius(),

        borderWidth:
            isPinnedActive && pinnedContainer.borderWidth !== undefined
                ? getPinnedContainerBorderWidth()
                : getContainerBorderWidth(),

        borderStyle:
            isPinnedActive && pinnedContainer.borderStyle !== undefined
                ? pinnedContainer.borderStyle
                : containerBase.borderStyle,
        borderColor:
            isPinnedActive && pinnedContainer.borderColor !== undefined
                ? pinnedContainer.borderColor
                : containerBase.borderColor,

        boxShadow: isPinnedActive
            ? pinnedContainer.boxShadow.replace(
                  /rgba\(([^,]+),([^,]+),([^,]+),[^)]+\)/,
                  `rgba($1,$2,$3,${pinnedContainer.shadowOpacity ?? 0.1})`
              )
            : containerBase.boxShadow,
    }

    const getPinnedMenuPadding = () => {
        const p = props.pinnedMenuColumnStyles
        if (!p) return "0px"

        return p.paddingPerSide
            ? `${p.paddingTop || 0}px ${p.paddingRight || 0}px ${p.paddingBottom || 0}px ${p.paddingLeft || 0}px`
            : `${p.padding || 0}px`
    }

    const getPinnedMenuBorderRadius = () => {
        const p = props.pinnedMenuColumnStyles
        if (!p) return "0px"

        return p.borderRadiusPerCorner
            ? `${p.borderTopLeft || 0}px ${p.borderTopRight || 0}px ${p.borderBottomRight || 0}px ${p.borderBottomLeft || 0}px`
            : `${p.borderRadius || 0}px`
    }

    const getPinnedMenuBorderWidth = () => {
        const p = props.pinnedMenuColumnStyles
        if (!p) return "0px"

        return p.borderWidthPerSide
            ? `${p.borderTop || 0}px ${p.borderRight || 0}px ${p.borderBottom || 0}px ${p.borderLeft || 0}px`
            : `${p.borderWidth || 0}px`
    }

    const getMenuColumnBorderRadius = () => {
        const base = props.menuColumnSettings
        if (!base) return "0px"

        return base.borderRadiusPerCorner
            ? `${base.borderTopLeft || 0}px ${base.borderTopRight || 0}px ${base.borderBottomRight || 0}px ${base.borderBottomLeft || 0}px`
            : `${base.borderRadius || 0}px`
    }

    const getMenuColumnBorderWidth = () => {
        const base = props.menuColumnSettings
        if (!base) return "0px"

        return base.borderWidthPerSide
            ? `${base.borderTop || 0}px ${base.borderRight || 0}px ${base.borderBottom || 0}px ${base.borderLeft || 0}px`
            : `${base.borderWidth || 0}px`
    }

    const pinnedMenu = props.pinnedMenuColumnStyles || {}
    const menuColumnBase = props.menuColumnSettings || {}
    const activeMenu = isPinnedActive ? pinnedMenu : menuColumnBase

    const menuColumnStyle = {
        ...getColumnWidth(
            "menu",
            menuColumnWidth,
            menuColumnValue,
            menuColumnMaxWidth
        ),

        padding: isPinnedActive
            ? getPinnedMenuPadding()
            : getMenuColumnPadding(),
        display: props.menuColumnDisplay || "flex",
        flexDirection: props.menuColumnFlexDirection || "column",
        gap: `${props.menuColumnGap}px`,
        justifyContent: props.menuColumnJustifyContent || "flex-start",
        alignItems: props.menuColumnAlignItems || "flex-start",

        overflowY: "visible",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        boxSizing: "border-box",

        position: activeMenu.position,
        top: activeMenu.top,
        right: activeMenu.right,
        bottom: activeMenu.bottom,
        left: activeMenu.left,
        zIndex: activeMenu.zIndex,
        backgroundColor: activeMenu.backgroundColor,
        borderRadius: isPinnedActive
            ? getPinnedMenuBorderRadius()
            : getMenuColumnBorderRadius(),

        borderWidth: isPinnedActive
            ? getPinnedMenuBorderWidth()
            : getMenuColumnBorderWidth(),
        borderStyle: activeMenu.borderStyle,
        borderColor: activeMenu.borderColor,
        boxShadow:
            isPinnedActive && pinnedMenu.boxShadow
                ? pinnedMenu.boxShadow.replace(
                      /rgba\(([^,]+),([^,]+),([^,]+),[^)]+\)/,
                      `rgba($1,$2,$3,${pinnedMenu.shadowOpacity ?? 0.1})`
                  )
                : menuColumnBase.boxShadow,
    }

    const categoryHeaderStyle = {
        width: props.categoryHeaderBox?.width,
        overflow: props.categoryHeaderBox?.overflow,
        padding: getCategoryHeaderPadding(),
        borderWidth: getCategoryHeaderBorderWidth(),
        borderStyle: props.categoryHeaderBox?.borderStyle,
        borderColor: props.categoryHeaderBox?.borderColor,
        borderRadius: getCategoryHeaderBorderRadius(),
        display: props.categoryHeaderBox?.display,
        flexDirection: props.categoryHeaderBox?.flexDirection,
        justifyContent: props.categoryHeaderBox?.justifyContent,
        alignItems: props.categoryHeaderBox?.alignItems,
        gap: `${props.categoryHeaderBox?.gap}px`,
        backgroundColor: props.categoryHeaderBox?.backgroundColor,
    }

    const getImageBorderRadius = () => {
        if (imageRadiusPerCorner) {
            return `${imageTopLeft || 0}px ${imageTopRight || 0}px ${imageBottomRight || 0}px ${imageBottomLeft || 0}px`
        }
        return `${imageRadius || 0}px`
    }

    const getImageBorderWidth = () => {
        if (imageBorderPerSide) {
            return `${imageBorderTop || 0}px ${imageBorderRight || 0}px ${imageBorderBottom || 0}px ${imageBorderLeft || 0}px`
        }
        return `${imageBorderWidth || 0}px`
    }

    const getImageShadow = () => {
        if (!imageShadow) return "none"
        return `${imageShadowX || 0}px ${imageShadowY || 5}px ${imageShadowBlur || 10}px ${imageShadowColor || "rgba(0, 0, 0, 0.1)"}`
    }

    const getImageHeight = () => {
        const { imageSettings } = props
        if (!imageSettings) return "100%"

        switch (imageSettings.imageHeightType) {
            case "viewport":
                return `${imageSettings.imageHeightViewport}vh`
            case "fit-content":
                return "fit-content"
            case "relative":
                return `${imageSettings.imageHeightRelative}%`
            case "fixed":
            default:
                return `${imageSettings.imageHeight}px`
        }
    }

    const getPinnedPadding = () => {
        const s = props.pinnedImageStyles
        if (!s) return "0px"
        return s.paddingPerSide
            ? `${s.paddingTop || 0}px ${s.paddingRight || 0}px ${s.paddingBottom || 0}px ${s.paddingLeft || 0}px`
            : `${s.padding || 0}px`
    }

    const getPinnedBorderRadius = () => {
        const s = props.pinnedImageStyles
        if (!s) return "0px"
        return s.borderRadiusPerCorner
            ? `${s.borderTopLeft || 0}px ${s.borderTopRight || 0}px ${s.borderBottomRight || 0}px ${s.borderBottomLeft || 0}px`
            : `${s.borderRadius || 0}px`
    }

    const getPinnedBorderWidth = () => {
        const p = props.pinnedImageStyles
        if (!p) return "0px"
        return p.borderWidthPerSide
            ? `${p.borderTop || 0}px ${p.borderRight || 0}px ${p.borderBottom || 0}px ${p.borderLeft || 0}px`
            : `${p.borderWidth || 0}px`
    }

    const s = props.imageSettings || {}
    const p = props.pinnedImageStyles || {}
    const c = props.imageColumnSettings || {}

    const imageColumnStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        position: isPinnedActive ? p.position : imageColumnPosition,
        top: isPinnedActive ? p.top : imageColumnTop,
        right: isPinnedActive ? p.right : imageColumnRight,
        bottom: isPinnedActive ? p.bottom : imageColumnBottom,
        left: isPinnedActive ? p.left : imageColumnLeft,
        zIndex: isPinnedActive ? p.zIndex : imageColumnZIndex,

        maxWidth: isPinnedActive
            ? p.maxWidth || c.imageColumnMaxWidth
            : c.imageColumnMaxWidth,
        maxHeight: isPinnedActive
            ? p.maxHeight || c.imageColumnMaxHeight
            : c.imageColumnMaxHeight,

        backgroundColor: isPinnedActive
            ? p.backgroundColor
            : imageColumnBackground,
        padding: isPinnedActive ? getPinnedPadding() : getImageColumnPadding(),
        borderRadius: isPinnedActive
            ? getPinnedBorderRadius()
            : getImageColumnBorderRadius(),

        borderWidth: isPinnedActive
            ? getPinnedBorderWidth()
            : getImageColumnBorderWidth(),
        borderStyle: isPinnedActive ? p.borderStyle : c.imageColumnBorderStyle,
        borderColor: isPinnedActive ? p.borderColor : c.imageColumnBorderColor,

        ...getColumnWidth(
            "image",
            imageColumnWidth,
            imageColumnValue,
            imageColumnMaxWidth
        ),

        transform: `
        scale(${s.imageTransformScale})
        rotate(${s.imageTransformRotate}deg)
        translateX(${isPinnedActive ? p.translateX : s.imageTransformTranslateX})
        translateY(${isPinnedActive ? p.translateY : s.imageTransformTranslateY})
    `,
    }

    const t = props.imageTransition || {}
    let transitionStyle = "opacity 0.3s ease"

    if (t.type === "tween") {
        const ease = Array.isArray(t.ease)
            ? `cubic-bezier(${t.ease.join(",")})`
            : t.ease || "ease"
        transitionStyle = `opacity ${t.duration || 0.3}s ${ease} ${t.delay || 0}s`
    } else if (t.type === "spring" && t.duration) {
        transitionStyle = `opacity ${t.duration}s ease-out ${t.delay || 0}s`
    }

    const imageStyle = {
        width: imageWidth,
        maxWidth: props.imageSettings?.imageMaxWidth,
        maxHeight: props.imageSettings?.imageMaxHeight,
        height: getImageHeight(),
        objectFit: imageObjectFit,
        objectPosition: imageObjectPosition,
        borderRadius: getImageBorderRadius(),
        borderWidth: getImageBorderWidth(),
        borderStyle: imageBorderStyle,
        borderColor: imageBorderColor,
        boxShadow: getImageShadow(),
        // opacity: imageOpacity,
        // transition: `opacity ${imageTransition || 0.3}s ease`,
    }

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }

        checkMobile()
        window.addEventListener("resize", checkMobile)

        // Set initial item
        if (menuData.length > 0) {
            setSelectedItem(menuData[0])
        }

        return () => window.removeEventListener("resize", checkMobile)
    }, [menuData])

    useEffect(() => {
        if (!menuData) return

        const grouped = menuData.reduce((acc, item) => {
            const category = item.Category.trim()

            if (!acc[category]) {
                acc[category] = {
                    items: [],
                    description: {
                        ger: item["Category Description (GER)"],
                        en: item["Category Description (EN)"],
                    },
                }
            }
            acc[category].items.push(item)

            return acc
        }, {})

        Object.values(grouped).forEach((group) => {
            group.items.sort((a, b) => {
                const numA = parseInt(a["Food No."], 10)
                const numB = parseInt(b["Food No."], 10)
                return numA - numB
            })
        })

        let orderedGrouped = grouped

        if (props.categoryOrder && props.categoryOrder.length > 0) {
            orderedGrouped = {}

            props.categoryOrder.forEach((cat) => {
                const category = cat.trim()
                if (grouped[category]) {
                    orderedGrouped[category] = grouped[category]
                }
            })

            Object.keys(grouped).forEach((cat) => {
                if (!orderedGrouped[cat]) {
                    orderedGrouped[cat] = grouped[cat]
                }
            })
        }

        setGroupedMenu(orderedGrouped)
    }, [menuData])

    const handleItemHover = (item) => {
        if (!isMobile) {
            setHoveredItem(item)
            setSelectedItem(item)
        }
    }

    const handleItemClick = (item) => {
        if (isMobile) {
            setSelectedItem(item)
            setHoveredItem(null)
        }
    }

    const getCurrentItem = () => {
        return (
            hoveredItem ||
            selectedItem ||
            (menuData.length > 0 ? menuData[0] : null)
        )
    }

    const currentItem = getCurrentItem()

    useEffect(() => {
        setLoaded(false)
    }, [currentItem.Image])

    const formatCategoryName = (category) => {
        const categoryMap = {
            SASHIMI: { name: "SASHIMI", japanese: "刺身" },
            "CHIRASHI BOWL": { name: "CHIRASHI BOWL", japanese: "ちらし丼" },
            NIGIRI: { name: "NIGIRI", japanese: "にぎり" },
        }

        return categoryMap[category] || { name: category, japanese: "" }
    }

    if (!menuData || menuData.length === 0) {
        return (
            <div
                style={{
                    backgroundColor,
                    padding: getPadding(),
                    position: "relative",
                    width: "full",
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    fontFamily: "Host Grotesk, sans-serif",
                    gap: "20px",
                }}
            >
                <div
                    style={{
                        fontSize: "40px",
                        filter: "hue-rotate(45deg)",
                    }}
                >
                    ✨
                </div>
                <div
                    style={{
                        color: textColor,
                        fontSize: "24px",
                        fontWeight: "500",
                        textAlign: "center",
                    }}
                >
                    Add Content
                </div>
                <div
                    style={{
                        color: textColor,
                        fontSize: "16px",
                        fontWeight: "400",
                        textAlign: "center",
                        opacity: 0.7,
                        maxWidth: "300px",
                    }}
                >
                    Add menu items to display your interactive menu here.
                </div>
            </div>
        )
    }

    return (
        <div id="container" style={containerStyle} ref={containerRef}>
            {/* Image Column */}
            <div style={imageColumnStyle}>
                {currentItem && (
                    <img
                        src={currentItem.Image}
                        alt={currentItem["Image:alt"]}
                        style={{
                            ...imageStyle,
                            opacity: loaded ? 1 : 0,
                            transition: transitionStyle,
                        }}
                        onLoad={() => setLoaded(true)}
                    />
                )}
            </div>

            {isPinnedActive ? (
                <div
                    style={{
                        width: "50%",
                    }}
                ></div>
            ) : (
                ""
            )}

            {/* Menu Column */}
            <div style={menuColumnStyle}>
                {Object.entries(groupedMenu).map(
                    ([categoryName, categoryData]) => {
                        const categoryJap = categoryData?.items[0]?.Japanese
                        const categoryInfo = formatCategoryName(categoryName)

                        return (
                            <div
                                key={categoryName}
                                style={{
                                    width: props.categorySectionLayout?.width,
                                    display:
                                        props.categorySectionLayout?.display,
                                    flexDirection:
                                        props.categorySectionLayout
                                            ?.flexDirection,
                                    justifyContent:
                                        props.categorySectionLayout
                                            ?.justifyContent,
                                    alignItems:
                                        props.categorySectionLayout?.alignItems,
                                    gap: `${props.categorySectionLayout?.gap}px`,
                                    maxHeight:
                                        props.categorySectionLayout?.maxHeight,
                                    overflow:
                                        props.categorySectionLayout?.overflow,
                                    padding: getCategorySectionPadding(),
                                    border: `${getCategorySectionBorderWidth()} ${props.categorySectionLayout?.borderStyle} ${props.categorySectionLayout?.borderColor}`,
                                    borderRadius:
                                        getCategorySectionBorderRadius(),
                                    backgroundColor:
                                        props.categorySectionLayout
                                            ?.backgroundColor,
                                }}
                            >
                                {/* Category Header */}
                                <div
                                    id={categoryName
                                        .toLowerCase()
                                        .replace(/\s+/g, "-")}
                                    style={categoryHeaderStyle}
                                >
                                    <div>
                                        <span
                                            style={{
                                                ...categoryFont,
                                                color: props.categoryColor,
                                            }}
                                        >
                                            {categoryInfo.name}
                                            {categoryJap && (
                                                <>
                                                    {" | "}
                                                    <span
                                                        style={{
                                                            ...props.japaneseFont,
                                                            color: props.japaneseColor,
                                                        }}
                                                    >
                                                        {categoryJap}
                                                    </span>
                                                </>
                                            )}
                                        </span>
                                    </div>

                                    {categoryData.description.ger && (
                                        <div
                                            style={{
                                                display:
                                                    props
                                                        .categoryDescriptionLayout
                                                        ?.display,
                                                flexDirection:
                                                    props
                                                        .categoryDescriptionLayout
                                                        ?.flexDirection,
                                                justifyContent:
                                                    props
                                                        .categoryDescriptionLayout
                                                        ?.justifyContent,
                                                alignItems:
                                                    props
                                                        .categoryDescriptionLayout
                                                        ?.alignItems,
                                                gap: `${props.categoryDescriptionLayout?.gap}px`,
                                                padding:
                                                    getCategoryDescriptionPadding(),
                                                backgroundColor:
                                                    props
                                                        .categoryDescriptionLayout
                                                        ?.backgroundColor,
                                            }}
                                        >
                                            <div
                                                style={{
                                                    ...props.categoryDescriptionFontDE,
                                                    color: props.categoryDescriptionColorDE,
                                                }}
                                            >
                                                {categoryData.description.ger}
                                            </div>
                                            <div
                                                style={{
                                                    ...props.categoryDescriptionFontEN,
                                                    color: props.categoryDescriptionColorEN,
                                                }}
                                            >
                                                {categoryData.description.en}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Menu Items */}
                                <div
                                    style={{
                                        width: "100%",
                                        maxHeight:
                                            props.menuItemsLayout?.maxHeight,
                                        display: props.menuItemsLayout?.display,
                                        flexDirection:
                                            props.menuItemsLayout
                                                ?.flexDirection,
                                        justifyContent:
                                            props.menuItemsLayout
                                                ?.justifyContent,
                                        alignItems:
                                            props.menuItemsLayout?.alignItems,
                                        gap: `${props.menuItemsLayout?.gap}px`,
                                        padding: getMenuItemsPadding(),
                                        border: `${getMenuItemsBorderWidth()} ${props.menuItemsLayout?.borderStyle} ${props.menuItemsLayout?.borderColor}`,
                                        borderRadius:
                                            getMenuItemsBorderRadius(),
                                        backgroundColor:
                                            props.menuItemsLayout
                                                ?.backgroundColor,
                                    }}
                                >
                                    {categoryData.items.map((item) => {
                                        const isHovered =
                                            hoveredItem?.Name === item.Name
                                        const isSelected =
                                            selectedItem?.Name === item.Name
                                        const activeItemColor = props.hoverColor
                                        const isActiveitem =
                                            isHovered || isSelected

                                        return (
                                            <div
                                                key={item.Slug}
                                                style={{
                                                    width: props
                                                        .itemWrapperLayout
                                                        ?.width,
                                                    display:
                                                        props.itemWrapperLayout
                                                            ?.display || "flex",
                                                    flexDirection:
                                                        props.itemWrapperLayout
                                                            ?.flexDirection ||
                                                        "row",
                                                    justifyContent:
                                                        props.itemWrapperLayout
                                                            ?.justifyContent ||
                                                        "space-between",
                                                    alignItems:
                                                        props.itemWrapperLayout
                                                            ?.alignItems ||
                                                        "flex-start",
                                                    gap: `${props.itemWrapperLayout?.gap || 0}px`,
                                                    padding:
                                                        getItemWrapperPadding(),
                                                    border: props
                                                        .itemWrapperLayout
                                                        ?.border,
                                                    borderWidth:
                                                        getItemWrapperBorderWidth(),
                                                    borderStyle:
                                                        props.itemWrapperLayout
                                                            ?.borderStyle,
                                                    borderColor:
                                                        props.itemWrapperLayout
                                                            ?.borderColor,
                                                    borderRadius:
                                                        getItemWrapperBorderRadius(),
                                                    backgroundColor:
                                                        props.itemWrapperLayout
                                                            ?.backgroundColor,
                                                }}
                                                onMouseEnter={() =>
                                                    handleItemHover(item)
                                                }
                                                onClick={() =>
                                                    handleItemClick(item)
                                                }
                                            >
                                                <div
                                                    style={{
                                                        // width: "48px",
                                                        ...props.foodNumberFont,
                                                        color: isActiveitem
                                                            ? activeItemColor
                                                            : props.foodNumberColor,
                                                    }}
                                                >
                                                    {item["Food No."]}
                                                </div>

                                                <div
                                                    style={{
                                                        width: props.nameDescCol
                                                            ?.width,
                                                        flex: props.nameDescCol
                                                            ?.flex,
                                                        display: "flex",
                                                        flexDirection:
                                                            props.nameDescCol
                                                                ?.flexDirection,
                                                        alignItems:
                                                            props.nameDescCol
                                                                ?.alignItems,
                                                        justifyContent:
                                                            props.nameDescCol
                                                                ?.justifyContent,
                                                        gap: `${props.nameDescCol?.gap}px`,
                                                        padding:
                                                            getNameDescColPadding(),
                                                        borderRadius:
                                                            getNameDescColBorderRadius(),
                                                        borderWidth:
                                                            getNameDescColBorderWidth(),
                                                        borderStyle:
                                                            props.nameDescCol
                                                                ?.borderStyle,
                                                        borderColor:
                                                            props.nameDescCol
                                                                ?.borderColor,
                                                        backgroundColor:
                                                            props.nameDescCol
                                                                ?.backgroundColor,
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            width: "100%",
                                                            display: "flex",
                                                            alignItems:
                                                                "center",
                                                            gap: `${props.itemLabelGap}px`,
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                ...itemNameFont,
                                                                width: "fit-content",
                                                                color: isActiveitem
                                                                    ? activeItemColor
                                                                    : itemColor,
                                                            }}
                                                        >
                                                            {item.Name}
                                                        </div>

                                                        {item[
                                                            "Allergens & Additives"
                                                        ] && (
                                                            <div
                                                                style={{
                                                                    ...props.allergenFont,
                                                                    color: isActiveitem
                                                                        ? activeItemColor
                                                                        : props.allergenColor,
                                                                }}
                                                            >
                                                                {
                                                                    item[
                                                                        "Allergens & Additives"
                                                                    ]
                                                                }
                                                            </div>
                                                        )}

                                                        {item.Quantity && (
                                                            <div
                                                                style={{
                                                                    ...props.quantityFont,
                                                                    color: isActiveitem
                                                                        ? activeItemColor
                                                                        : props.quantityColor,
                                                                }}
                                                            >
                                                                {item.Quantity}
                                                            </div>
                                                        )}

                                                        {item[
                                                            "Vegetarian (Optional)"
                                                        ] && (
                                                            <div
                                                                style={{
                                                                    ...props.vegetarianFont,
                                                                    color: isActiveitem
                                                                        ? activeItemColor
                                                                        : props.vegetarianColor,
                                                                }}
                                                            >
                                                                VEGAN
                                                            </div>
                                                        )}
                                                        {item[
                                                            "Spicy (Optional)"
                                                        ] && (
                                                            <div
                                                                style={{
                                                                    ...props.spicyFont,
                                                                    color: isActiveitem
                                                                        ? activeItemColor
                                                                        : props.spicyColor,
                                                                }}
                                                            >
                                                                SPICY
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div
                                                        style={{
                                                            width: props.descCol
                                                                .width,
                                                            display: "flex",
                                                            flexDirection:
                                                                props.descCol
                                                                    .flexDirection,
                                                            alignItems:
                                                                props.descCol
                                                                    .alignItems,
                                                            justifyContent:
                                                                props.descCol
                                                                    .justifyContent,
                                                            gap: props.descCol
                                                                .gap,
                                                            padding:
                                                                props.descCol
                                                                    .padding,
                                                            backgroundColor:
                                                                props.descCol
                                                                    .backgroundColor,
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                ...props.descriptionFontDE,
                                                                color: props.descriptionColorDE,
                                                            }}
                                                        >
                                                            {item[
                                                                "Food Description (GER)"
                                                            ].replace(
                                                                /<[^>]*>/g,
                                                                ""
                                                            )}
                                                        </div>
                                                        <div
                                                            style={{
                                                                ...props.descriptionFontEN,
                                                                color: props.descriptionColorEN,
                                                            }}
                                                        >
                                                            {item[
                                                                "Food Description (EN)"
                                                            ].replace(
                                                                /<[^>]*>/g,
                                                                ""
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div
                                                    style={{
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        justifyContent:
                                                            "center",
                                                        alignItems: "flex-end",
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            ...priceFont,
                                                            color: isActiveitem
                                                                ? activeItemColor
                                                                : priceColor,
                                                        }}
                                                    >
                                                        {item[
                                                            "Price (€)"
                                                        ].toFixed(2)}{" "}
                                                        €
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    }
                )}
            </div>
        </div>
    )
}

InteractiveMenu.displayName = "InteractiveMenu.tsx"

// Framer property controls
addPropertyControls(InteractiveMenu, {
    menuData: {
        type: ControlType.Array,
        title: "Menu Items",
        propertyControl: {
            type: ControlType.Object,
            controls: {
                Slug: {
                    type: ControlType.String,
                    title: "Slug",
                },
                "Food No.": {
                    type: ControlType.String,
                    title: "Food Number",
                },
                Name: {
                    type: ControlType.String,
                    title: "Name",
                },
                Category: {
                    type: ControlType.String,
                    title: "Category",
                },
                Japanese: { type: ControlType.String, title: "Japanese Name" },
                "Category Description (GER)": {
                    type: ControlType.String,
                    title: "Category Description (German)",
                },
                "Category Description (EN)": {
                    type: ControlType.String,
                    title: "Category Description (English)",
                },
                Image: {
                    type: ControlType.Image,
                    title: "Image",
                },
                "Image:alt": {
                    type: ControlType.String,
                    title: "Image Alt Text",
                },
                "Food Description (GER)": {
                    type: ControlType.String,
                    title: "Food Description (German)",
                },
                "Food Description (EN)": {
                    type: ControlType.String,
                    title: "Food Description (English)",
                },
                "Price (€)": {
                    type: ControlType.Number,
                    title: "Price (€)",
                },
                "Allergens & Additives": {
                    type: ControlType.String,
                    title: "Allergens & Additives",
                },
                "Vegetarian (Optional)": {
                    type: ControlType.Boolean,
                    title: "Vegetarian",
                    defaultValue: false,
                },
                "Spicy (Optional)": {
                    type: ControlType.Boolean,
                    title: "Spicy",
                    defaultValue: false,
                },
                Quantity: {
                    type: ControlType.String,
                    title: "Quantity",
                },
            },
        },
    },
    categoryOrder: {
        type: ControlType.Array,
        title: "Order Category ",
        control: {
            type: ControlType.String,
            placeholder: "e.g. SASHIMI",
        },
    },

    layoutOptions: {
        type: ControlType.Object,
        title: "Layout Options",
        controls: {
            display: {
                type: ControlType.Enum,
                title: "Display",
                options: ["flex", "inline-flex", "block", "inline-block"],
                optionTitles: ["Flex", "Inline Flex", "Block", "Inline Block"],
                defaultValue: "flex",
            },
            flexDirection: {
                type: ControlType.Enum,
                title: "Flex Direction",
                options: ["row", "column"],
                optionTitles: ["Row", "Column"],
                defaultValue: "column",
                displaySegmentedControl: true,
            },
            gap: {
                type: ControlType.Number,
                title: "Gap",
                defaultValue: 40,
                unit: "px",
            },
            justifyContent: {
                type: ControlType.Enum,
                title: "Justify Content",
                options: [
                    "flex-start",
                    "center",
                    "flex-end",
                    "space-between",
                    "space-around",
                    "space-evenly",
                ],
                optionTitles: [
                    "Start",
                    "Center",
                    "End",
                    "Space Between",
                    "Space Around",
                    "Space Evenly",
                ],
                defaultValue: "flex-start",
            },
            alignItems: {
                type: ControlType.Enum,
                title: "Align Items",
                options: ["flex-start", "center", "flex-end", "stretch"],
                optionTitles: ["Start", "Center", "End", "Stretch"],
                defaultValue: "flex-start",
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
            position: {
                type: ControlType.Enum,
                title: "Position",
                options: ["relative", "absolute", "fixed", "sticky"],
                defaultValue: "relative",
            },
            top: {
                type: ControlType.String,
                title: "Top",
                defaultValue: "auto",
            },
            right: {
                type: ControlType.String,
                title: "Right",
                defaultValue: "auto",
            },
            bottom: {
                type: ControlType.String,
                title: "Bottom",
                defaultValue: "auto",
            },
            left: {
                type: ControlType.String,
                title: "Left",
                defaultValue: "auto",
            },
            zIndex: {
                type: ControlType.Number,
                title: "Z-Index",
                defaultValue: 1,
            },
            backgroundColor: {
                type: ControlType.Color,
                title: "Background",
                defaultValue: "transparent",
            },
            borderStyle: {
                type: ControlType.Enum,
                title: "Border Style",
                options: ["solid", "dashed", "dotted", "double"],
                defaultValue: "solid",
            },
            borderColor: {
                type: ControlType.Color,
                title: "Border Color",
                defaultValue: "#000",
            },
            borderWidth: {
                type: ControlType.FusedNumber,
                title: "Border Width",
                toggleKey: "borderWidthPerSide",
                toggleTitles: ["All Sides", "Per Side"],
                valueKeys: [
                    "borderTop",
                    "borderRight",
                    "borderBottom",
                    "borderLeft",
                ],
                valueLabels: ["T", "R", "B", "L"],
                min: 0,
                unit: "px",
            },
            borderRadius: {
                type: ControlType.FusedNumber,
                title: "Border Radius",
                toggleKey: "borderRadiusPerCorner",
                toggleTitles: ["All Corners", "Per Corner"],
                valueKeys: [
                    "borderTopLeft",
                    "borderTopRight",
                    "borderBottomRight",
                    "borderBottomLeft",
                ],
                valueLabels: ["TL", "TR", "BR", "BL"],
                min: 0,
                unit: "px",
            },
            boxShadow: {
                type: ControlType.String,
                title: "Box Shadow",
                defaultValue: "0px 4px 10px rgba(0, 0, 0, 0)",
            },
        },
    },
    columnWidths: {
        type: ControlType.Object,
        title: "Column Widths",
        controls: {
            imageColumnWidth: {
                type: ControlType.Enum,
                title: "Image Column Width",
                options: ["fit-content", "relative", "fixed", "fill"],
                optionTitles: ["Fit Content", "Relative", "Fixed", "Fill"],
                defaultValue: "relative",
            },
            imageColumnValue: {
                type: ControlType.Number,
                title: "Image col Width",
                defaultValue: 50,
                min: 0,
                max: 100,
                // step: 5,
                unit: "%",
                displayStepper: true,
                hidden: (props) =>
                    props.columnWidths?.imageColumnWidth === "fit-content" ||
                    props.columnWidths?.imageColumnWidth === "fill",
            },
            imageColumnMaxWidth: {
                type: ControlType.String,
                title: "Image col Max Width",
                defaultValue: "100%",
            },
            menuColumnWidth: {
                type: ControlType.Enum,
                title: "Menu Column Width",
                options: ["fit-content", "relative", "fixed", "fill"],
                optionTitles: ["Fit Content", "Relative", "Fixed", "Fill"],
                defaultValue: "relative",
            },
            menuColumnValue: {
                type: ControlType.Number,
                title: "Menu col Width",
                defaultValue: 100,
                // min: 10,
                // max: 90,
                // step: 5,
                unit: "%",
                displayStepper: true,
                hidden: (props) =>
                    props.columnWidths?.menuColumnWidth === "fit-content" ||
                    props.columnWidths?.menuColumnWidth === "fill",
            },
            menuColumnMaxWidth: {
                type: ControlType.String,
                title: "Menu Max Width",
                defaultValue: "100%",
            },
        },
    },

    imageSettings: {
        type: ControlType.Object,
        title: "Image Settings",
        controls: {
            imageMaxWidth: {
                type: ControlType.String,
                title: "Max Width",
            },
            imageMaxHeight: {
                type: ControlType.String,
                title: "Max Height",
            },
            imageWidth: {
                type: ControlType.String,
                title: "Width",
                defaultValue: "100%",
            },
            imageColumnBackground: {
                type: ControlType.Color,
                title: "Background",
                defaultValue: "transparent",
            },
            imageColumnPosition: {
                type: ControlType.Enum,
                title: "Position",
                options: ["static", "relative", "absolute", "fixed", "sticky"],
                optionTitles: [
                    "Static",
                    "Relative",
                    "Absolute",
                    "Fixed",
                    "Sticky",
                ],
                defaultValue: "relative",
            },
            imageColumnTop: {
                type: ControlType.String,
                title: "Top",
                defaultValue: "0px",
                hidden: (props) =>
                    props.imageColumnSettings?.imageColumnPosition === "static",
            },

            imageColumnRight: {
                type: ControlType.String,
                title: "Right",
                defaultValue: "0px",
                hidden: (props) =>
                    props.imageColumnSettings?.imageColumnPosition ===
                        "static" ||
                    props.imageColumnSettings?.imageColumnPosition === "sticky",
            },

            imageColumnBottom: {
                type: ControlType.String,
                title: "Bottom",
                defaultValue: "0px",
                hidden: (props) =>
                    props.imageColumnSettings?.imageColumnPosition ===
                        "static" ||
                    props.imageColumnSettings?.imageColumnPosition === "sticky",
            },

            imageColumnLeft: {
                type: ControlType.String,
                title: "Left",
                defaultValue: "0px",
                hidden: (props) =>
                    props.imageColumnSettings?.imageColumnPosition ===
                        "static" ||
                    props.imageColumnSettings?.imageColumnPosition === "sticky",
            },

            imageColumnZIndex: {
                type: ControlType.Number,
                title: "Z-Index",
                defaultValue: 1,
                displayStepper: true,
                hidden: (props) =>
                    props.imageColumnSettings?.imageColumnPosition === "static",
            },
            imageHeightType: {
                type: ControlType.Enum,
                title: "Image Height Type",
                options: ["fixed", "viewport", "fit-content", "relative"],
                optionTitles: ["Fixed", "Viewport", "Fit Content", "Relative"],
                defaultValue: "relative",
                displaySegmentedControl: false,
            },
            imageHeight: {
                type: ControlType.Number,
                title: "Image Height",
                defaultValue: "100%",
                min: 0,
                // max: 800,
                // step: 50,
                unit: "px",
                displayStepper: true,
                hidden: (props) =>
                    props.imageSettings?.imageHeightType !== "fixed",
            },
            imageHeightViewport: {
                type: ControlType.Number,
                title: "Viewport Height",
                defaultValue: 100,
                min: 0,
                max: 100,
                step: 0,
                unit: "vh",
                displayStepper: true,
                hidden: (props) =>
                    props.imageSettings?.imageHeightType !== "viewport",
            },
            imageHeightRelative: {
                type: ControlType.Number,
                title: "Relative Height",
                defaultValue: 100,
                min: 0,
                max: 100,
                step: 0,
                unit: "%",
                displayStepper: true,
                hidden: (props) =>
                    props.imageSettings?.imageHeightType !== "relative",
            },
            imageObjectFit: {
                type: ControlType.Enum,
                title: "Image Fit",
                options: ["contain", "cover", "fill", "scale-down", "none"],
                optionTitles: [
                    "Contain",
                    "Cover",
                    "Fill",
                    "Scale Down",
                    "None",
                ],
                defaultValue: "contain",
            },
            imageObjectPosition: {
                type: ControlType.Enum,
                title: "Image Position",
                options: [
                    "center",
                    "top",
                    "bottom",
                    "left",
                    "right",
                    "top left",
                    "top right",
                    "bottom left",
                    "bottom right",
                ],
                optionTitles: [
                    "Center",
                    "Top",
                    "Bottom",
                    "Left",
                    "Right",
                    "Top Left",
                    "Top Right",
                    "Bottom Left",
                    "Bottom Right",
                ],
                defaultValue: "center",
            },
            imageRadius: {
                type: ControlType.FusedNumber,
                title: "Image Border Radius",
                defaultValue: 0,
                toggleKey: "imageRadiusPerCorner",
                toggleTitles: ["All Corners", "Per Corner"],
                valueKeys: [
                    "imageTopLeft",
                    "imageTopRight",
                    "imageBottomRight",
                    "imageBottomLeft",
                ],
                valueLabels: ["TL", "TR", "BR", "BL"],
                min: 0,
                // max: 50,
                // step: 0,
                unit: "px",
            },
            imageBorderWidth: {
                type: ControlType.FusedNumber,
                title: "Image Border Width",
                defaultValue: 0,
                toggleKey: "imageBorderPerSide",
                toggleTitles: ["All Sides", "Per Side"],
                valueKeys: [
                    "imageBorderTop",
                    "imageBorderRight",
                    "imageBorderBottom",
                    "imageBorderLeft",
                ],
                valueLabels: ["T", "R", "B", "L"],
                // min: 0,
                // max: 100,
                step: 0,
                unit: "px",
            },
            imageBorderStyle: {
                type: ControlType.Enum,
                title: "Image Border Style",
                options: ["solid", "dashed", "dotted", "double"],
                optionTitles: ["Solid", "Dashed", "Dotted", "Double"],
                defaultValue: "solid",
                // hidden: (props) =>
                //     (props.imageSettings?.imageBorderWidth || 0) === 0,
            },
            imageBorderColor: {
                type: ControlType.Color,
                title: "Image Border Color",
                defaultValue: "#090F0F",
                // hidden: (props) =>
                //     (props.imageSettings?.imageBorderWidth || 0) === 0,
            },
            imageTransition: {
                type: ControlType.Transition,
                title: "Image Transition",
                defaultValue: {
                    duration: 0.3,
                    ease: "easeInOut",
                },
            },
            imageTransformScale: {
                type: ControlType.Number,
                title: "Scale",
                defaultValue: 1,
                step: 0.01,
                min: 0,
            },
            imageTransformRotate: {
                type: ControlType.Number,
                title: "Rotate (deg)",
                defaultValue: 0,
                step: 1,
                unit: "°",
            },
            imageTransformTranslateX: {
                type: ControlType.String,
                title: "Translate X",
                defaultValue: "0px",
            },
            imageTransformTranslateY: {
                type: ControlType.String,
                title: "Translate Y",
                defaultValue: "0px",
            },
        },
    },
    imageColumnSettings: {
        type: ControlType.Object,
        title: "Image Wrapper Settings",
        controls: {
            imageColumnMaxWidth: {
                type: ControlType.String,
                title: "Max Width",
                defaultValue: "100%",
            },
            imageColumnMaxHeight: {
                type: ControlType.String,
                title: "Max Height",
                defaultValue: "100vh",
            },
            imageColumnPadding: {
                type: ControlType.FusedNumber,
                title: "Padding",
                defaultValue: 0,
                toggleKey: "imageColumnPaddingPerSide",
                toggleTitles: ["All Sides", "Per Side"],
                valueKeys: [
                    "imageColumnPaddingTop",
                    "imageColumnPaddingRight",
                    "imageColumnPaddingBottom",
                    "imageColumnPaddingLeft",
                ],
                valueLabels: ["T", "R", "B", "L"],
                min: 0,
                max: 100,
                step: 5,
                unit: "px",
            },
            imageColumnBorderWidth: {
                type: ControlType.FusedNumber,
                title: "Border Width",
                defaultValue: 0,
                toggleKey: "imageColumnBorderPerSide",
                toggleTitles: ["All Sides", "Per Side"],
                valueKeys: [
                    "imageColumnBorderTop",
                    "imageColumnBorderRight",
                    "imageColumnBorderBottom",
                    "imageColumnBorderLeft",
                ],
                valueLabels: ["T", "R", "B", "L"],
                min: 0,
                max: 10,
                step: 1,
                unit: "px",
            },
            imageColumnBorderStyle: {
                type: ControlType.Enum,
                title: "Border Style",
                options: ["solid", "dashed", "dotted", "double"],
                optionTitles: ["Solid", "Dashed", "Dotted", "Double"],
                defaultValue: "solid",
            },
            imageColumnBorderColor: {
                type: ControlType.Color,
                title: "Border Color",
                defaultValue: "#090F0F",
            },
            imageColumnBorderRadius: {
                type: ControlType.FusedNumber,
                title: "Border Radius",
                defaultValue: 0,
                toggleKey: "imageColumnRadiusPerCorner",
                toggleTitles: ["All Corners", "Per Corner"],
                valueKeys: [
                    "imageColumnTopLeft",
                    "imageColumnTopRight",
                    "imageColumnBottomRight",
                    "imageColumnBottomLeft",
                ],
                valueLabels: ["TL", "TR", "BR", "BL"],
                min: 0,
                // max: 50,
                // step: 1,
                unit: "px",
            },
        },
    },
    enablePinnedImageStyles: {
        type: ControlType.Boolean,
        title: "Enable Pinned Styles",
        defaultValue: false,
    },
    pinnedContainerStyles: {
        type: ControlType.Object,
        title: "Pinned Container Styles",
        hidden: (props) => !props.enablePinnedImageStyles,
        controls: {
            position: {
                type: ControlType.Enum,
                title: "Position",
                options: ["relative", "absolute", "fixed", "sticky"],
                optionTitles: ["Relative", "Absolute", "Fixed", "Sticky"],
                defaultValue: "relative",
            },
            top: {
                type: ControlType.String,
                title: "Top",
                defaultValue: "auto",
            },
            right: {
                type: ControlType.String,
                title: "Right",
                defaultValue: "auto",
            },
            bottom: {
                type: ControlType.String,
                title: "Bottom",
                defaultValue: "auto",
            },
            left: {
                type: ControlType.String,
                title: "Left",
                defaultValue: "auto",
            },
            zIndex: {
                type: ControlType.Number,
                title: "Z-Index",
                defaultValue: 1,
            },
            backgroundColor: {
                type: ControlType.Color,
                title: "Background",
                defaultValue: "transparent",
            },
            padding: {
                type: ControlType.FusedNumber,
                title: "Padding",
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
                unit: "px",
            },
            borderRadius: {
                type: ControlType.FusedNumber,
                title: "Border Radius",
                toggleKey: "borderRadiusPerCorner",
                toggleTitles: ["All Corners", "Per Corner"],
                valueKeys: [
                    "borderTopLeft",
                    "borderTopRight",
                    "borderBottomRight",
                    "borderBottomLeft",
                ],
                valueLabels: ["TL", "TR", "BR", "BL"],
                min: 0,
                unit: "px",
            },
            borderWidth: {
                type: ControlType.FusedNumber,
                title: "Border Width",
                toggleKey: "borderWidthPerSide",
                toggleTitles: ["All Sides", "Per Side"],
                valueKeys: [
                    "borderTop",
                    "borderRight",
                    "borderBottom",
                    "borderLeft",
                ],
                valueLabels: ["T", "R", "B", "L"],
                min: 0,
                unit: "px",
            },
            borderStyle: {
                type: ControlType.Enum,
                title: "Border Style",
                options: ["solid", "dashed", "dotted", "double"],
                optionTitles: ["Solid", "Dashed", "Dotted", "Double"],
                defaultValue: "solid",
            },
            borderColor: {
                type: ControlType.Color,
                title: "Border Color",
                defaultValue: "#000",
            },
            boxShadow: {
                type: ControlType.String,
                title: "Box Shadow",
                defaultValue: "0px 4px 10px rgba(0, 0, 0, 1)",
            },
            shadowOpacity: {
                type: ControlType.Number,
                title: "Shadow Opacity",
                min: 0,
                max: 1,
                step: 0.05,
                defaultValue: 0.1,
            },
        },
    },

    pinnedImageStyles: {
        type: ControlType.Object,
        title: "Pinned Image Styles",
        hidden: (props) => !props.enablePinnedImageStyles,
        controls: {
            position: {
                type: ControlType.Enum,
                title: "Position",
                options: ["static", "relative", "absolute", "fixed", "sticky"],
                optionTitles: [
                    "Static",
                    "Relative",
                    "Absolute",
                    "Fixed",
                    "Sticky",
                ],
                defaultValue: "static",
            },

            pinnedImgmaxWidth: {
                type: ControlType.String,
                title: "Max Width",
                defaultValue: "100%",
            },
            pinnedImgmaxHeight: {
                type: ControlType.String,
                title: "Max Height",
                defaultValue: "100%",
            },

            top: {
                type: ControlType.String,
                title: "Top",
                // defaultValue: "50%",
            },
            right: {
                type: ControlType.String,
                title: "Right",
                // defaultValue: "auto",
            },
            bottom: {
                type: ControlType.String,
                title: "Bottom",
                // defaultValue: "auto",
            },
            left: {
                type: ControlType.String,
                title: "Left",
                // defaultValue: "25%",
            },
            translateX: {
                type: ControlType.String,
                title: "Translate X",
                // defaultValue: "-50%",
            },
            translateY: {
                type: ControlType.String,
                title: "Translate Y",
                // defaultValue: "-50%",
            },
            zIndex: {
                type: ControlType.Number,
                title: "Z-Index",
                // defaultValue: 1,
            },
            backgroundColor: {
                type: ControlType.Color,
                title: "Background",
                // defaultValue: "transparent",
            },
            padding: {
                type: ControlType.FusedNumber,
                title: "Padding",
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
                unit: "px",
            },
            borderWidth: {
                type: ControlType.FusedNumber,
                title: "Border Width",
                toggleKey: "borderWidthPerSide",
                toggleTitles: ["All Sides", "Per Side"],
                valueKeys: [
                    "borderTop",
                    "borderRight",
                    "borderBottom",
                    "borderLeft",
                ],
                valueLabels: ["T", "R", "B", "L"],
                min: 0,
                unit: "px",
            },
            borderStyle: {
                type: ControlType.Enum,
                title: "Border Style",
                options: ["solid", "dashed", "dotted", "double"],
                optionTitles: ["Solid", "Dashed", "Dotted", "Double"],
                defaultValue: "solid",
            },
            borderColor: {
                type: ControlType.Color,
                title: "Border Color",
                defaultValue: "#000",
            },

            borderRadius: {
                type: ControlType.FusedNumber,
                title: "Border Radius",
                toggleKey: "borderRadiusPerCorner",
                toggleTitles: ["All Corners", "Per Corner"],
                valueKeys: [
                    "borderTopLeft",
                    "borderTopRight",
                    "borderBottomRight",
                    "borderBottomLeft",
                ],
                valueLabels: ["TL", "TR", "BR", "BL"],
                min: 0,
                unit: "px",
            },
        },
    },
    pinnedMenuColumnStyles: {
        type: ControlType.Object,
        title: "Pinned Menu Styles",
        hidden: (props) => !props.enablePinnedImageStyles,
        controls: {
            position: {
                type: ControlType.Enum,
                title: "Position",
                options: ["static", "relative", "absolute", "fixed", "sticky"],
                optionTitles: [
                    "Static",
                    "Relative",
                    "Absolute",
                    "Fixed",
                    "Sticky",
                ],
                defaultValue: "relative",
            },

            top: {
                type: ControlType.String,
                title: "Top",
                defaultValue: "0px",
            },
            right: {
                type: ControlType.String,
                title: "Right",
                defaultValue: "auto",
            },
            bottom: {
                type: ControlType.String,
                title: "Bottom",
                defaultValue: "auto",
            },
            left: {
                type: ControlType.String,
                title: "Left",
                defaultValue: "0px",
            },
            zIndex: {
                type: ControlType.Number,
                title: "Z-Index",
                defaultValue: 2,
            },
            backgroundColor: {
                type: ControlType.Color,
                title: "Background",
                defaultValue: "transparent",
            },
            padding: {
                type: ControlType.FusedNumber,
                title: "Padding",
                toggleKey: "paddingPerSide",
                toggleTitles: ["All Sides", "Per Side"],
                valueKeys: [
                    "paddingTop",
                    "paddingRight",
                    "paddingBottom",
                    "paddingLeft",
                ],
                valueLabels: ["T", "R", "B", "L"],
                unit: "px",
                min: 0,
            },
            borderRadius: {
                type: ControlType.FusedNumber,
                title: "Border Radius",
                toggleKey: "borderRadiusPerCorner",
                toggleTitles: ["All Corners", "Per Corner"],
                valueKeys: [
                    "borderTopLeft",
                    "borderTopRight",
                    "borderBottomRight",
                    "borderBottomLeft",
                ],
                valueLabels: ["TL", "TR", "BR", "BL"],
                unit: "px",
                min: 0,
            },
            borderWidth: {
                type: ControlType.FusedNumber,
                title: "Border Width",
                toggleKey: "borderWidthPerSide",
                toggleTitles: ["All Sides", "Per Side"],
                valueKeys: [
                    "borderTop",
                    "borderRight",
                    "borderBottom",
                    "borderLeft",
                ],
                valueLabels: ["T", "R", "B", "L"],
                unit: "px",
                min: 0,
            },
            borderStyle: {
                type: ControlType.Enum,
                title: "Border Style",
                options: ["solid", "dashed", "dotted", "double"],
                optionTitles: ["Solid", "Dashed", "Dotted", "Double"],
                defaultValue: "solid",
            },
            borderColor: {
                type: ControlType.Color,
                title: "Border Color",
                defaultValue: "#000",
            },
            boxShadow: {
                type: ControlType.String,
                title: "Box Shadow",
                defaultValue: "0px 4px 10px rgba(0, 0, 0, 1)",
            },
            shadowOpacity: {
                type: ControlType.Number,
                title: "Shadow Opacity",
                min: 0,
                max: 1,
                step: 0.05,
                defaultValue: 0.1,
            },
        },
    },

    categoryHeaderBox: {
        type: ControlType.Object,
        title: "Cat Header Layout",
        controls: {
            width: {
                type: ControlType.String,
                title: "Width",
                defaultValue: "100%",
            },
            overflow: {
                type: ControlType.Enum,
                title: "Overflow",
                options: ["visible", "hidden", "scroll", "auto"],
                optionTitles: ["Visible", "Hidden", "Scroll", "Auto"],
                defaultValue: "visible",
            },
            display: {
                type: ControlType.Enum,
                title: "Display",
                options: ["flex", "block"],
                optionTitles: ["Flex", "Block"],
                defaultValue: "flex",
            },
            flexDirection: {
                type: ControlType.Enum,
                title: "Direction",
                options: ["row", "column"],
                optionTitles: ["Row", "Column"],
                defaultValue: "column",
            },
            justifyContent: {
                type: ControlType.Enum,
                title: "Justify",
                options: [
                    "flex-start",
                    "center",
                    "flex-end",
                    "space-between",
                    "space-around",
                    "space-evenly",
                ],
                optionTitles: [
                    "Start",
                    "Center",
                    "End",
                    "Space Between",
                    "Space Around",
                    "Space Evenly",
                ],
                defaultValue: "flex-start",
            },
            alignItems: {
                type: ControlType.Enum,
                title: "Align Items",
                options: ["flex-start", "center", "flex-end", "stretch"],
                optionTitles: ["Start", "Center", "End", "Stretch"],
                defaultValue: "flex-start",
            },
            gap: {
                type: ControlType.Number,
                title: "Gap",
                defaultValue: 0,
                unit: "px",
            },
            padding: {
                type: ControlType.FusedNumber,
                title: "Padding",
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
                unit: "px",
            },
            borderWidth: {
                type: ControlType.FusedNumber,
                title: "Border Width",
                defaultValue: 2,
                toggleKey: "borderWidthPerSide",
                toggleTitles: ["All Sides", "Per Side"],
                valueKeys: [
                    "borderTop",
                    "borderRight",
                    "borderBottom",
                    "borderLeft",
                ],
                valueLabels: ["T", "R", "B", "L"],
                min: 0,
                unit: "px",
            },
            borderStyle: {
                type: ControlType.Enum,
                title: "Border Style",
                options: ["solid", "dashed", "dotted", "double"],
                optionTitles: ["Solid", "Dashed", "Dotted", "Double"],
                defaultValue: "solid",
            },
            borderColor: {
                type: ControlType.Color,
                title: "Border Color",
                defaultValue: "#000",
            },
            borderRadius: {
                type: ControlType.FusedNumber,
                title: "Border Radius",
                toggleKey: "borderRadiusPerCorner",
                toggleTitles: ["All Corners", "Per Corner"],
                valueKeys: [
                    "borderTopLeft",
                    "borderTopRight",
                    "borderBottomRight",
                    "borderBottomLeft",
                ],
                valueLabels: ["TL", "TR", "BR", "BL"],
                min: 0,
                unit: "px",
            },
            backgroundColor: {
                type: ControlType.Color,
                title: "Background",
                defaultValue: "transparent",
            },
        },
    },

    categoryDescriptionLayout: {
        type: ControlType.Object,
        title: "Layout Cat Desc",
        controls: {
            display: {
                type: ControlType.Enum,
                title: "Display",
                options: ["flex", "block"],
                optionTitles: ["Flex", "Block"],
                defaultValue: "flex",
            },
            flexDirection: {
                type: ControlType.Enum,
                title: "Direction",
                options: ["row", "column"],
                optionTitles: ["Row", "Column"],
                defaultValue: "column",
            },
            justifyContent: {
                type: ControlType.Enum,
                title: "Justify",
                options: [
                    "flex-start",
                    "center",
                    "flex-end",
                    "space-between",
                    "space-around",
                    "space-evenly",
                ],
                optionTitles: [
                    "Start",
                    "Center",
                    "End",
                    "Space Between",
                    "Space Around",
                    "Space Evenly",
                ],
                defaultValue: "flex-start",
            },
            alignItems: {
                type: ControlType.Enum,
                title: "Align",
                options: ["flex-start", "center", "flex-end", "stretch"],
                optionTitles: ["Start", "Center", "End", "Stretch"],
                defaultValue: "flex-start",
            },
            gap: {
                type: ControlType.Number,
                title: "Gap",
                defaultValue: 0,
                unit: "px",
            },
            padding: {
                type: ControlType.FusedNumber,
                title: "Padding",
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
                unit: "px",
            },
            backgroundColor: {
                type: ControlType.Color,
                title: "Background",
                defaultValue: "transparent",
            },
        },
    },
    categoryFont: {
        type: ControlType.Font,
        title: "Category Font",
        controls: "extended",
        defaultFontType: "sans-serif",
        defaultValue: {
            fontSize: 24,
            lineHeight: 1.2,
            fontFamily: "Host Grotesk, sans-serif",
            fontWeight: 500,
        },
    },

    categoryColor: {
        type: ControlType.Color,
        title: "Category Color",
        defaultValue: "#090F0F",
    },
    japaneseFont: {
        type: ControlType.Font,
        title: "Japanese Font",
        controls: "extended",
        defaultFontType: "sans-serif",
        defaultValue: {
            fontSize: 20,
            fontFamily: "Noto Sans CJK JP, sans-serif",
            fontWeight: 400,
        },
    },
    japaneseColor: {
        type: ControlType.Color,
        title: "Japanese Color",
        defaultValue: "#090F0F",
    },

    categoryDescriptionFontDE: {
        type: ControlType.Font,
        title: "Desc Font (DE)",
        controls: "extended",
        defaultFontType: "sans-serif",
        defaultValue: {
            fontSize: 16,
            fontFamily: "Sofia Sans Condensed, sans-serif",
            fontWeight: 400,
        },
    },
    categoryDescriptionColorDE: {
        type: ControlType.Color,
        title: "Desc Color (DE)",
        defaultValue: "#090F0F",
    },

    categoryDescriptionFontEN: {
        type: ControlType.Font,
        title: "Desc Font (EN)",
        controls: "extended",
        defaultFontType: "sans-serif",
        defaultValue: {
            fontSize: 16,
            fontFamily: "Sofia Sans Condensed, sans-serif",
            fontStyle: "italic",
            fontWeight: 400,
        },
    },
    categoryDescriptionColorEN: {
        type: ControlType.Color,
        title: "Desc Color (EN)",
        defaultValue: "#090F0F",
    },

    menuColumnSettings: {
        type: ControlType.Object,
        title: "Menu Column Settings",
        controls: {
            menuColumnPosition: {
                type: ControlType.Enum,
                title: "Position",
                options: ["static", "relative", "absolute", "fixed", "sticky"],
                optionTitles: [
                    "Static",
                    "Relative",
                    "Absolute",
                    "Fixed",
                    "Sticky",
                ],
                defaultValue: "static",
            },
            menuColumnTop: {
                type: ControlType.Number,
                title: "Top",
                defaultValue: 0,
                unit: "px",
                displayStepper: true,
                // hidden: (props) =>
                //     props.menuColumnSettings?.menuColumnPosition === "static",
            },
            menuColumnRight: {
                type: ControlType.Number,
                title: "Right",
                defaultValue: 0,
                unit: "px",
                displayStepper: true,
                // hidden: (props) =>
                //     props.menuColumnSettings?.menuColumnPosition === "static" ||
                //     props.menuColumnSettings?.menuColumnPosition === "sticky",
            },
            menuColumnBottom: {
                type: ControlType.Number,
                title: "Bottom",
                defaultValue: 0,
                unit: "px",
                displayStepper: true,
                // hidden: (props) =>
                //     props.menuColumnSettings?.menuColumnPosition === "static" ||
                //     props.menuColumnSettings?.menuColumnPosition === "sticky",
            },
            menuColumnLeft: {
                type: ControlType.Number,
                title: "Left",
                defaultValue: 0,
                unit: "px",
                displayStepper: true,
                // hidden: (props) =>
                //     props.menuColumnSettings?.menuColumnPosition === "static" ||
                //     props.menuColumnSettings?.menuColumnPosition === "sticky",
            },
            menuColumnZIndex: {
                type: ControlType.Number,
                title: "Z-Index",
                defaultValue: 1,
                displayStepper: true,
                // hidden: (props) =>
                //     props.menuColumnSettings?.menuColumnPosition === "static",
            }, // 🆕 Border Style
            borderStyle: {
                type: ControlType.Enum,
                title: "Border Style",
                options: ["solid", "dashed", "dotted", "double"],
                optionTitles: ["Solid", "Dashed", "Dotted", "Double"],
                defaultValue: "solid",
            },
            borderColor: {
                type: ControlType.Color,
                title: "Border Color",
                defaultValue: "#000",
            },
            borderWidth: {
                type: ControlType.FusedNumber,
                title: "Border Width",
                toggleKey: "borderWidthPerSide",
                toggleTitles: ["All Sides", "Per Side"],
                valueKeys: [
                    "borderTop",
                    "borderRight",
                    "borderBottom",
                    "borderLeft",
                ],
                valueLabels: ["T", "R", "B", "L"],
                unit: "px",
                min: 0,
            },
            borderRadius: {
                type: ControlType.FusedNumber,
                title: "Border Radius",
                toggleKey: "borderRadiusPerCorner",
                toggleTitles: ["All Corners", "Per Corner"],
                valueKeys: [
                    "borderTopLeft",
                    "borderTopRight",
                    "borderBottomRight",
                    "borderBottomLeft",
                ],
                valueLabels: ["TL", "TR", "BR", "BL"],
                unit: "px",
                min: 0,
            },
        },
    },
    menuColumnDisplay: {
        type: ControlType.Enum,
        title: "Menu Column Display",
        options: ["flex", "block", "inline", "inline-block", "grid", "none"],
        optionTitles: [
            "Flex",
            "Block",
            "Inline",
            "Inline Block",
            "Grid",
            "None",
        ],
        defaultValue: "flex",
    },
    menuColumnFlexDirection: {
        type: ControlType.Enum,
        title: "Menu Column Direction",
        options: ["row", "column", "row-reverse", "column-reverse"],
        optionTitles: ["Row", "Column", "Row Reverse", "Column Reverse"],
        defaultValue: "column",
        hidden: (props) => props.menuColumnDisplay !== "flex",
    },
    menuColumnGap: {
        type: ControlType.Number,
        title: "Menu Column Gap",
        defaultValue: 64,
        min: 0,
        // max: 200,
        // step: 8,
        unit: "px",
        // displayStepper: true,
        hidden: (props) => props.menuColumnDisplay !== "flex",
    },
    menuColumnJustifyContent: {
        type: ControlType.Enum,
        title: "Menu Column Justify",
        options: [
            "flex-start",
            "center",
            "flex-end",
            "space-between",
            "space-around",
            "space-evenly",
        ],
        optionTitles: [
            "Start",
            "Center",
            "End",
            "Space Between",
            "Space Around",
            "Space Evenly",
        ],
        defaultValue: "flex-start",
        hidden: (props) => props.menuColumnDisplay !== "flex",
    },
    menuColumnAlignItems: {
        type: ControlType.Enum,
        title: "Menu Column Align",
        options: ["flex-start", "center", "flex-end", "stretch", "baseline"],
        optionTitles: ["Start", "Center", "End", "Stretch", "Baseline"],
        defaultValue: "flex-start",
        hidden: (props) => props.menuColumnDisplay !== "flex",
    },
    menuColumnPadding: {
        type: ControlType.FusedNumber,
        title: "Menu Column Padding",
        defaultValue: 0,
        toggleKey: "menuColumnPaddingPerSide",
        toggleTitles: ["All Sides", "Per Side"],
        valueKeys: [
            "menuColumnPaddingTop",
            "menuColumnPaddingRight",
            "menuColumnPaddingBottom",
            "menuColumnPaddingLeft",
        ],
        valueLabels: ["T", "R", "B", "L"],
        min: 0,
        unit: "px",
    },
    categorySectionLayout: {
        type: ControlType.Object,
        title: "Layout Category ",
        controls: {
            display: {
                type: ControlType.Enum,
                title: "Display",
                options: ["flex", "grid", "block"],
                optionTitles: ["Flex", "Grid", "Block"],
                defaultValue: "flex",
            },
            flexDirection: {
                type: ControlType.Enum,
                title: "Direction",
                options: ["row", "column"],
                optionTitles: ["Row", "Column"],
                defaultValue: "column",
            },
            justifyContent: {
                type: ControlType.Enum,
                title: "Justify",
                options: [
                    "flex-start",
                    "center",
                    "flex-end",
                    "space-between",
                    "space-around",
                    "space-evenly",
                ],
                optionTitles: [
                    "Start",
                    "Center",
                    "End",
                    "Space Between",
                    "Space Around",
                    "Space Evenly",
                ],
                defaultValue: "flex-start",
            },
            alignItems: {
                type: ControlType.Enum,
                title: "Align",
                options: ["flex-start", "center", "flex-end", "stretch"],
                optionTitles: ["Start", "Center", "End", "Stretch"],
                defaultValue: "flex-start",
            },
            gap: {
                type: ControlType.Number,
                title: "Gap",
                defaultValue: 24,
                unit: "px",
            },
            width: {
                type: ControlType.String,
                title: "Width",
                defaultValue: "100%",
            },
            maxHeight: {
                type: ControlType.String,
                title: "Max Height",
                defaultValue: undefined,
            },
            overflow: {
                type: ControlType.Enum,
                title: "Overflow",
                options: ["visible", "hidden", "scroll", "auto"],
                optionTitles: ["Visible", "Hidden", "Scroll", "Auto"],
                defaultValue: "visible",
            },
            padding: {
                type: ControlType.FusedNumber,
                title: "Padding",
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
                unit: "px",
            },
            borderWidth: {
                type: ControlType.FusedNumber,
                title: "Border Width",
                toggleKey: "borderWidthPerSide",
                toggleTitles: ["All Sides", "Per Side"],
                valueKeys: [
                    "borderTop",
                    "borderRight",
                    "borderBottom",
                    "borderLeft",
                ],
                valueLabels: ["T", "R", "B", "L"],
                min: 0,
                unit: "px",
            },
            borderStyle: {
                type: ControlType.Enum,
                title: "Border Style",
                options: ["solid", "dashed", "dotted", "double"],
                optionTitles: ["Solid", "Dashed", "Dotted", "Double"],
                defaultValue: "solid",
            },
            borderColor: {
                type: ControlType.Color,
                title: "Border Color",
                defaultValue: "#000",
            },
            borderRadius: {
                type: ControlType.FusedNumber,
                title: "Border Radius",
                toggleKey: "borderRadiusPerCorner",
                toggleTitles: ["All Corners", "Per Corner"],
                valueKeys: [
                    "borderTopLeft",
                    "borderTopRight",
                    "borderBottomRight",
                    "borderBottomLeft",
                ],
                valueLabels: ["TL", "TR", "BR", "BL"],
                min: 0,
                unit: "px",
            },
            backgroundColor: {
                type: ControlType.Color,
                title: "Background",
                defaultValue: "transparent",
            },
        },
    },

    itemWrapperLayout: {
        type: ControlType.Object,
        title: "Item Wrapper Layout",
        controls: {
            width: {
                type: ControlType.String,
                title: "Width",
                defaultValue: "100%",
            },
            display: {
                type: ControlType.Enum,
                title: "Display",
                options: ["flex", "grid", "block", "inline-block"],
                optionTitles: ["Flex", "Grid", "Block", "Inline Block"],
                defaultValue: "flex",
            },
            flexDirection: {
                type: ControlType.Enum,
                title: "Direction",
                options: ["row", "column", "row-reverse", "column-reverse"],
                optionTitles: [
                    "Row",
                    "Column",
                    "Row Reverse",
                    "Column Reverse",
                ],
                defaultValue: "row",
            },
            justifyContent: {
                type: ControlType.Enum,
                title: "Justify",
                options: [
                    "flex-start",
                    "center",
                    "flex-end",
                    "space-between",
                    "space-around",
                    "space-evenly",
                ],
                optionTitles: [
                    "Start",
                    "Center",
                    "End",
                    "Space Between",
                    "Space Around",
                    "Space Evenly",
                ],
                defaultValue: "space-between",
            },
            alignItems: {
                type: ControlType.Enum,
                title: "Align",
                options: [
                    "flex-start",
                    "center",
                    "flex-end",
                    "stretch",
                    "baseline",
                ],
                optionTitles: ["Start", "Center", "End", "Stretch", "Baseline"],
                defaultValue: "flex-start",
            },
            gap: {
                type: ControlType.Number,
                title: "Gap",
                defaultValue: 0,
                min: 0,
                max: 64,
                unit: "px",
            },
            padding: {
                type: ControlType.FusedNumber,
                title: "Padding",
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
                unit: "px",
            },
            borderWidth: {
                type: ControlType.FusedNumber,
                title: "Border Width",
                toggleKey: "borderWidthPerSide",
                toggleTitles: ["All Sides", "Per Side"],
                valueKeys: [
                    "borderTop",
                    "borderRight",
                    "borderBottom",
                    "borderLeft",
                ],
                valueLabels: ["T", "R", "B", "L"],
                min: 0,
                unit: "px",
            },
            borderStyle: {
                type: ControlType.Enum,
                title: "Border Style",
                options: ["solid", "dashed", "dotted", "double"],
                optionTitles: ["Solid", "Dashed", "Dotted", "Double"],
                defaultValue: "solid",
            },
            borderColor: {
                type: ControlType.Color,
                title: "Border Color",
                defaultValue: "#000",
            },
            borderRadius: {
                type: ControlType.FusedNumber,
                title: "Border Radius",
                toggleKey: "borderRadiusPerCorner",
                toggleTitles: ["All Corners", "Per Corner"],
                valueKeys: [
                    "borderTopLeft",
                    "borderTopRight",
                    "borderBottomRight",
                    "borderBottomLeft",
                ],
                valueLabels: ["TL", "TR", "BR", "BL"],
                min: 0,
                unit: "px",
            },
            backgroundColor: {
                type: ControlType.Color,
                title: "Background Color",
                defaultValue: "transparent",
            },
        },
    },
    menuItemsLayout: {
        type: ControlType.Object,
        title: "Menu Items Layout",
        controls: {
            width: {
                type: ControlType.String,
                title: "Width",
                defaultValue: "100%",
            },
            maxHeight: {
                type: ControlType.String,
                title: "Max Height",
                defaultValue: undefined,
            },
            display: {
                type: ControlType.Enum,
                title: "Display",
                options: ["flex", "grid", "block", "inline-block"],
                optionTitles: ["Flex", "Grid", "Block", "Inline Block"],
                defaultValue: "flex",
            },
            flexDirection: {
                type: ControlType.Enum,
                title: "Direction",
                options: ["row", "column", "row-reverse", "column-reverse"],
                optionTitles: [
                    "Row",
                    "Column",
                    "Row Reverse",
                    "Column Reverse",
                ],
                defaultValue: "column",
            },
            justifyContent: {
                type: ControlType.Enum,
                title: "Justify",
                options: [
                    "flex-start",
                    "center",
                    "flex-end",
                    "space-between",
                    "space-around",
                    "space-evenly",
                ],
                optionTitles: [
                    "Start",
                    "Center",
                    "End",
                    "Space Between",
                    "Space Around",
                    "Space Evenly",
                ],
                defaultValue: "flex-start",
            },
            alignItems: {
                type: ControlType.Enum,
                title: "Align",
                options: [
                    "flex-start",
                    "center",
                    "flex-end",
                    "stretch",
                    "baseline",
                ],
                optionTitles: ["Start", "Center", "End", "Stretch", "Baseline"],
                defaultValue: "flex-start",
            },
            gap: {
                type: ControlType.Number,
                title: "Gap",
                defaultValue: 24,
                min: 0,
                max: 100,
                unit: "px",
            },
            padding: {
                type: ControlType.FusedNumber,
                title: "Padding",
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
                unit: "px",
            },
            borderWidth: {
                type: ControlType.FusedNumber,
                title: "Border Width",
                toggleKey: "borderWidthPerSide",
                toggleTitles: ["All Sides", "Per Side"],
                valueKeys: [
                    "borderTop",
                    "borderRight",
                    "borderBottom",
                    "borderLeft",
                ],
                valueLabels: ["T", "R", "B", "L"],
                min: 0,
                unit: "px",
            },
            borderStyle: {
                type: ControlType.Enum,
                title: "Border Style",
                options: ["solid", "dashed", "dotted", "double"],
                optionTitles: ["Solid", "Dashed", "Dotted", "Double"],
                defaultValue: "solid",
            },
            borderColor: {
                type: ControlType.Color,
                title: "Border Color",
                defaultValue: "#000",
            },
            borderRadius: {
                type: ControlType.FusedNumber,
                title: "Border Radius",
                toggleKey: "borderRadiusPerCorner",
                toggleTitles: ["All Corners", "Per Corner"],
                valueKeys: [
                    "borderTopLeft",
                    "borderTopRight",
                    "borderBottomRight",
                    "borderBottomLeft",
                ],
                valueLabels: ["TL", "TR", "BR", "BL"],
                min: 0,
                unit: "px",
            },

            backgroundColor: {
                type: ControlType.Color,
                title: "Background",
                defaultValue: "transparent",
            },
        },
    },
    nameDescCol: {
        type: ControlType.Object,
        title: "Name/Desc Col",
        controls: {
            width: {
                type: ControlType.String,
                title: "Width",
                defaultValue: "100%",
            },
            flex: {
                type: ControlType.String,
                title: "Flex",
                defaultValue: "1 1 0",
            },
            flexDirection: {
                type: ControlType.Enum,
                title: "Direction",
                options: ["row", "column", "row-reverse", "column-reverse"],
                optionTitles: [
                    "Row",
                    "Column",
                    "Row Reverse",
                    "Column Reverse",
                ],
                defaultValue: "column",
            },
            alignItems: {
                type: ControlType.Enum,
                title: "Align Items",
                options: ["flex-start", "center", "flex-end", "stretch"],
                optionTitles: ["Start", "Center", "End", "Stretch"],
                defaultValue: "center",
            },
            justifyContent: {
                type: ControlType.Enum,
                title: "Justify Content",
                options: [
                    "flex-start",
                    "center",
                    "flex-end",
                    "space-between",
                    "space-around",
                    "space-evenly",
                ],
                optionTitles: [
                    "Start",
                    "Center",
                    "End",
                    "Space Between",
                    "Space Around",
                    "Space Evenly",
                ],
                defaultValue: "flex-start",
            },
            gap: {
                type: ControlType.Number,
                title: "Gap",
                defaultValue: 0,
                min: 0,
                unit: "px",
            },
            padding: {
                type: ControlType.FusedNumber,
                title: "Padding",
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
                unit: "px",
            },
            borderRadius: {
                type: ControlType.FusedNumber,
                title: "Border Radius",
                toggleKey: "borderRadiusPerCorner",
                toggleTitles: ["All Corners", "Per Corner"],
                valueKeys: [
                    "borderTopLeft",
                    "borderTopRight",
                    "borderBottomRight",
                    "borderBottomLeft",
                ],
                valueLabels: ["TL", "TR", "BR", "BL"],
                min: 0,
                unit: "px",
            },
            borderWidth: {
                type: ControlType.FusedNumber,
                title: "Border Width",
                toggleKey: "borderWidthPerSide",
                toggleTitles: ["All Sides", "Per Side"],
                valueKeys: [
                    "borderTop",
                    "borderRight",
                    "borderBottom",
                    "borderLeft",
                ],
                valueLabels: ["T", "R", "B", "L"],
                min: 0,
                unit: "px",
            },
            borderStyle: {
                type: ControlType.Enum,
                title: "Border Style",
                options: ["solid", "dashed", "dotted", "double"],
                optionTitles: ["Solid", "Dashed", "Dotted", "Double"],
                defaultValue: "solid",
            },
            borderColor: {
                type: ControlType.Color,
                title: "Border Color",
                defaultValue: "#000000",
            },
            backgroundColor: {
                type: ControlType.Color,
                title: "Background",
                defaultValue: "transparent",
            },
        },
    },

    descCol: {
        type: ControlType.Object,
        title: "Desc COl",
        controls: {
            width: {
                type: ControlType.String,
                title: "Width",
                defaultValue: "100%",
                placeholder: "100%, 300px, auto...",
            },
            flexDirection: {
                type: ControlType.Enum,
                title: "Direction",
                options: ["row", "column", "row-reverse", "column-reverse"],
                defaultValue: "column",
            },
            alignItems: {
                type: ControlType.Enum,
                title: "Align Items",
                options: [
                    "flex-start",
                    "center",
                    "flex-end",
                    "stretch",
                    "baseline",
                ],
                defaultValue: "flex-start",
            },
            justifyContent: {
                type: ControlType.Enum,
                title: "Justify Content",
                options: [
                    "flex-start",
                    "center",
                    "flex-end",
                    "space-between",
                    "space-around",
                    "space-evenly",
                ],
                defaultValue: "flex-start",
            },
            gap: {
                type: ControlType.Number,
                title: "Gap",
                defaultValue: 0,
                min: 0,
                max: 100,
                step: 1,
                unit: "px",
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
            backgroundColor: {
                type: ControlType.Color,
                title: "Background",
                defaultValue: "transparent",
            },
        },
    },
    backgroundColor: {
        type: ControlType.Color,
        title: "Fill",
        defaultValue: "#CA6F6C",
    },
    hoverColor: {
        type: ControlType.Color,
        title: "Active Color",
        defaultValue: "#CE3726",
    },
    // textColor: {
    //     type: ControlType.Color,
    //     title: "Text Color",
    //     defaultValue: "#090F0F",
    // },
    // borderColor: {
    //     type: ControlType.Color,
    //     title: "Border Color",
    //     defaultValue: "#090F0F",
    // },
    foodNumberFont: {
        type: ControlType.Font,
        title: "Food No. Font",
        controls: "extended",
        defaultFontType: "sans-serif",
        defaultValue: {
            fontSize: 20,
            lineHeight: 1.2,
            fontFamily: "Host Grotesk, sans-serif",
            fontWeight: 500,
        },
    },
    foodNumberColor: {
        type: ControlType.Color,
        title: "Food No. Color",
        defaultValue: "#090F0F",
    },
    itemNameFont: {
        type: ControlType.Font,
        title: "Item Name Font",
        controls: "extended",
        defaultFontType: "sans-serif",
        defaultValue: {
            fontSize: 20,
            lineHeight: 1.2,
            fontFamily: "Host Grotesk, sans-serif",
            fontWeight: 500,
        },
    },
    itemColor: {
        type: ControlType.Color,
        title: "Item Name Color",
        defaultValue: "#090F0F",
    },
    itemLabelGap: {
        type: ControlType.Number,
        title: "Label Gap",
        defaultValue: 4,
        min: 0,
        max: 40,
        step: 1,
        unit: "px",
    },
    allergenFont: {
        type: ControlType.Font,
        title: "Allergen Font",
        controls: "extended",
        defaultFontType: "sans-serif",
        defaultValue: {
            fontSize: 10,
            fontWeight: 400,
        },
    },
    allergenColor: {
        type: ControlType.Color,
        title: "Allergen Color",
        defaultValue: "#090F0F",
    },
    vegetarianFont: {
        type: ControlType.Font,
        title: "Vegetarian Font",
        controls: "extended",
        defaultFontType: "sans-serif",
        defaultValue: {
            fontSize: 10,
            fontFamily: "Clash Grotesk Variable, sans-serif",
            fontWeight: 400,
        },
    },
    vegetarianColor: {
        type: ControlType.Color,
        title: "Vegetarian Color",
        defaultValue: "#090F0F",
    },
    spicyFont: {
        type: ControlType.Font,
        title: "Spicy Font",
        controls: "extended",
        defaultFontType: "sans-serif",
        defaultValue: {
            fontSize: 10,
            fontFamily: "Clash Grotesk Variable, sans-serif",
            fontWeight: 400,
        },
    },
    spicyColor: {
        type: ControlType.Color,
        title: "Spicy Color",
        defaultValue: "#090F0F",
    },
    quantityFont: {
        type: ControlType.Font,
        title: "Quantity Font",
        controls: "extended",
        defaultFontType: "sans-serif",
        defaultValue: {
            fontSize: 10,
            fontFamily: "Host Grotesk, sans-serif",
            fontWeight: 400,
        },
    },
    quantityColor: {
        type: ControlType.Color,
        title: "Quantity Color",
        defaultValue: "#090F0F",
    },
    descriptionFontDE: {
        type: ControlType.Font,
        title: "Desc Font(DE)",
        controls: "extended",
        defaultFontType: "sans-serif",
        defaultValue: {
            fontSize: 16,
            lineHeight: 1.2,
            fontFamily: "Sofia Sans Condensed, sans-serif",
            fontWeight: 400,
        },
    },
    descriptionColorDE: {
        type: ControlType.Color,
        title: "Description Color (DE)",
        defaultValue: "#090F0F",
    },
    descriptionFontEN: {
        type: ControlType.Font,
        title: "Desc Font(EN)",
        controls: "extended",
        defaultFontType: "sans-serif",
        defaultValue: {
            fontSize: 16,
            lineHeight: 1.2,
            fontFamily: "Sofia Sans Condensed, sans-serif",
            fontStyle: "italic",
            fontWeight: 400,
        },
    },
    descriptionColorEN: {
        type: ControlType.Color,
        title: "Description Color (EN)",
        defaultValue: "#090F0F",
    },
    priceFont: {
        type: ControlType.Font,
        title: "Price Font",
        controls: "extended",
        defaultFontType: "sans-serif",
        defaultValue: {
            fontSize: 16,
            lineHeight: 1.2,
            fontFamily: "Host Grotesk, sans-serif",
            fontWeight: 500,
        },
    },
    priceColor: {
        type: ControlType.Color,
        title: "Price Color",
        defaultValue: "#090F0F",
    },
})
