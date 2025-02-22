import { InternalModuleDeclaration, LoaderOptions, Modules } from "@medusajs/modules-sdk"
import { ModulesSdkTypes } from "@medusajs/types"
import { ModulesSdkUtils } from "@medusajs/utils"
import { EntitySchema } from "@mikro-orm/core"
import * as PromotionModels from "../models"

export default async (
  {
    options,
    container,
    logger,
  }: LoaderOptions<
    | ModulesSdkTypes.ModuleServiceInitializeOptions
    | ModulesSdkTypes.ModuleServiceInitializeCustomDataLayerOptions
  >,
  moduleDeclaration?: InternalModuleDeclaration
): Promise<void> => {
  const entities = Object.values(PromotionModels) as unknown as EntitySchema[]
  const pathToMigrations = __dirname + "/../migrations"

  await ModulesSdkUtils.mikroOrmConnectionLoader({
    moduleName: Modules.PROMOTION,
    entities,
    container,
    options,
    moduleDeclaration,
    logger,
    pathToMigrations,
  })
}
