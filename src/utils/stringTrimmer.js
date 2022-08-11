const trim = (string = "", limit = 40) => {
    let dots = "";
    if (string.length > limit) dots = "...";
    return string.slice(0, limit) + dots;
};

export default trim;
