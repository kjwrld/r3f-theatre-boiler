// studio.ts
if (import.meta.env.MODE === "development") {
    (async () => {
        const { default: studio } = await import("@theatre/studio");
        const extension = (await import("@theatre/r3f/dist/extension")).default;

        studio.initialize();
        studio.extend(extension);
    })();
}
