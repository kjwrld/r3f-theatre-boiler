import { getProject } from "@theatre/core";

// Create or get a project
export const project = getProject("My R3F Theatre Project");

// Create a sheet
export const sheet = project.sheet("Main Sheet");
