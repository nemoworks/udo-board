type ColumnDifinition = [string, string, Function, number] | [string, string, Function] | [string, string]

function generateColumns(source: ColumnDifinition[]): any {
  return source.map(([title, dataIndex, render, width]) => ({
    title,
    dataIndex,
    render,
    width,
  }))
}

export { generateColumns }
