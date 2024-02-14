function formatDate(inputDate) {
    // Parse the input string into a Date object
    const [year, month, day] = inputDate.split("-");
    const date = new Date(year, month - 1, day);

    // Use Intl.DateTimeFormat to format the date
    const formatter = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return formatter.format(date);
}

export { formatDate };
