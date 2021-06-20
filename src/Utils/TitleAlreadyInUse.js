export const TitleAlreadyInUse = (itemsToCheck, title) => {
    return itemsToCheck.filter((item) => item.title === title).length > 0;
};
