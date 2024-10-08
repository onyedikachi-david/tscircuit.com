import type { DbClient } from "./db-client"

export const seed = (db: DbClient) => {
  db.addAccount({
    github_username: "testuser",
  })
  db.addAccount({
    github_username: "seveibar",
  })
  db.addSnippet({
    name: "My Test Board",
    unscoped_name: "my-test-board",
    owner_name: "testuser",
    code: `
import { A555Timer } from "@tsci/seveibar.a555timer"

export default () => (
  <board width="10mm" height="10mm">
    <A555Timer />
  </board>
)`.trim(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    snippet_type: "board",
    description: "A simple board with an A555 Timer component",
  })

  // Define the @tsci/seveibar.a555timer package
  db.addSnippet({
    name: "seveibar/a555timer",
    unscoped_name: "a555timer",
    owner_name: "seveibar",
    code: `
export const A555Timer = ({ name }: { name: string }) => (
  <chip name={name} footprint="dip8" />
)
`.trim(),
    dts: `
declare module "@tsci/seveibar.a555timer" {
  export const A555Timer: ({ name }: {
    name: string;
  }) => any;
}
`.trim(),

    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    snippet_type: "package",
    description: "A simple package with an A555 Timer component",
  })
}
