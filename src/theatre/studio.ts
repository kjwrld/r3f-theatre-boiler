if (import.meta.env.MODE === "development") {
    (async () => {
        const { default: studio } = await import("@theatre/studio");
        const extension = (await import("@theatre/r3f/dist/extension")).default;

        studio.extend(extension);
        studio.initialize();
    })();
}
