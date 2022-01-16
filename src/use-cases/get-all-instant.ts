import { Settings } from "../settings";
export default function makeGetAllInstants({ instantsDb, instantsFtp }): any {
    return async function findAllInstants(): Promise<Object[]> {
        const instants = await instantsDb.findAll();
        for (const idx in instants) {
            const fn = instants[idx].fileName;
            const instantFound = await instantsFtp.getInstantImg(fn);
            const instantResizedFound = await instantsFtp.getInstantResizedImg(fn);
            const download = Settings.path.local.download
            const instantPath = instantFound ?
                `http://localhost:3000/${download}/${Settings.path.instants}/${fn}`
                : "Instant not present in the ftp server";
            const instantResizedPath = instantResizedFound ?
                `http://localhost:3000/${download}/${Settings.path.instantsResized}/${fn}`
                : "Instant resized not present in the ftp server"
            instants[idx] = {
                ...instants[idx], ...{
                    instant_url: instantPath,
                    instant_resized_url: instantResizedPath
                }
            }
        }
        return instants
    }
}