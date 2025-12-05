import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import benchmarkData from "@/constants/benchmark-data.json";

export function BenchmarkSummaryTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="font-semibold">Operation</TableHead>
          <TableHead className="font-semibold">@pyyupsk/fdu</TableHead>
          <TableHead className="font-semibold">Day.js</TableHead>
          <TableHead className="font-semibold">date-fns</TableHead>
          <TableHead className="font-semibold">Luxon</TableHead>
          <TableHead className="font-semibold text-right">
            Speedup vs Day.js
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {benchmarkData.results.map((benchmark) => (
          <TableRow key={benchmark.operation}>
            <TableCell className="font-medium">{benchmark.operation}</TableCell>
            <TableCell className="text-fd-primary font-semibold">
              {benchmark.fdu}
            </TableCell>
            <TableCell>{benchmark.dayjs}</TableCell>
            <TableCell>{benchmark.dateFns}</TableCell>
            <TableCell>{benchmark.luxon}</TableCell>
            <TableCell className="text-right">
              <Badge variant="outline">{benchmark.speedup}</Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export function BenchmarkInfo() {
  return (
    <span>
      Vitest {benchmarkData.vitestVersion} and Bun {benchmarkData.bunVersion} on{" "}
      {benchmarkData.date}
    </span>
  );
}
