"use client"

import * as React from "react"
import { Dot } from 'lucide-react';
import { Label, Pie, PieChart } from "recharts"
import { extractLabelFromHSL } from "@/utils/string"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

export type DonutChartData = {
    label: string
    value: number
    fill: string
}

export type DonutChartProps = {
    data: DonutChartData[]
    title: string
    subtitle: string
    label: string
    footer: string
}

const chartConfig = {
} satisfies ChartConfig

export default function DonutChart({ props }: { props: DonutChartProps }) {
    const total = React.useMemo(() => {
        return props.data.reduce((acc, curr) => acc + curr.value, 0)
    }, [props.data])

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>{props.title}</CardTitle>
                <CardDescription>{props.subtitle}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={props.data}
                            dataKey="value"
                            nameKey="label"
                            innerRadius={60}
                            strokeWidth={5}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    {total.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    {props.label}
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex leading-none text-muted-foreground">
                    {props.data.map((label, index) => {
                        return (
                          <div key={index} className="flex items-center">
                            <Dot
                              className={`h-8 w-8 text-${extractLabelFromHSL(label.fill)}`}
                            />
                            <span>{label.label}</span>
                          </div>
                        );
                    })}
                </div>
                <div className="flex items-center gap-2 font-medium leading-none">
                    {props.footer}
                </div>
            </CardFooter>
        </Card>
    )
}
