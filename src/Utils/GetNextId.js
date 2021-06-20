export const GetNextId = (listWithIds) => {
    return (
        listWithIds.reduce((acc, cur) => {
            if (cur.id > acc) {
                return cur.id;
            } else {
                return acc;
            }
        }, 0) + 1
    );
};
