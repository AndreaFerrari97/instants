export const Settings = {
    logging: {
        index: "info",
        instantsDb: "info",
        instantEmit: "info",
        instantFtp: "info",
    },
    path: {
        instants: "instants",
        instantsResized: "instants-resized",
        instantFtp: "instant-ftp",
        local: {
            download: "downloads",
            upload: "uploads"
        }
    },
    rabbitMq: {
        exchange: "resize"
    }
}