import { Wrapper } from "@/styles/global";
import { useList } from "./useList";
import { Card, ChartWrapper } from "./style";
import { Spinner } from "@/components/spinner";
import { Col, Row } from "antd";
import { FaUserAlt } from "react-icons/fa";
import { PieChart } from "./charts/pie.chart";
import { Barchart } from "./charts/bar.chart";
import { DoubleRangePicker } from "@/components/double-datepicker";
import { NumberFormat } from "@/components/number-format";

const Statistics = () => {
  const { form, graph, piechart, isLoading, analytics } = useList();

  return (
    <>
      <Wrapper>
        <Row gutter={[16, 16]}>
          <Col span={12} lg={8} style={{ marginBottom: 16 }}>
            <DoubleRangePicker
              control={form.control}
              name="filter"
              label="Sanani tanlang"
            />
          </Col>
        </Row>
        {isLoading ? (
          <Spinner />
        ) : (
          <Row gutter={[16, 16]}>
            <Col span={12} lg={4}>
              <Card>
                <h3>Mijozlar soni</h3>
                <div className="total">
                  <FaUserAlt />
                  <h3>{analytics?.users} ta</h3>
                </div>
              </Card>
            </Col>
            <Col span={12} lg={4}>
              <Card>
                <h3>Buyurtmalar soni</h3>
                <div className="total">
                  <FaUserAlt />
                  <h3>{analytics?.new_orders} ta</h3>
                </div>
              </Card>
            </Col>
            <Col span={12} lg={4}>
              <Card>
                <h3>Yetkazilganlar soni</h3>
                <div className="total">
                  <FaUserAlt />
                  <h3>{analytics?.delivered_orders} ta</h3>
                </div>
              </Card>
            </Col>
            <Col span={12} lg={4}>
              <Card>
                <h3>Qaytarilganlar soni</h3>
                <div className="total">
                  <FaUserAlt />
                  <h3>{analytics?.caneled_orders} ta</h3>
                </div>
              </Card>
            </Col>
            <Col span={12} lg={4}>
              <Card>
                <h3>Tushum</h3>
                <div className="total">
                  <FaUserAlt />
                  <h3>
                    <NumberFormat value={analytics?.income ?? 0} /> so`m
                  </h3>
                </div>
              </Card>
            </Col>
            <Col span={12} lg={4}>
              <Card>
                <h3>Foyda</h3>
                <div className="total">
                  <FaUserAlt />
                  <h3>
                    <NumberFormat value={analytics?.benefit ?? 0} /> so`m
                  </h3>
                </div>
              </Card>
            </Col>
          </Row>
        )}
        <ChartWrapper>
          <Row gutter={[16, 16]}>
            <Col span={24} lg={12}>
              <Card className="linechart-card">
                <div id="chart">
                  <Barchart graph={graph} />
                </div>
              </Card>
            </Col>
            <Col span={24} lg={12}>
              <Card className="linechart-card">
                <div id="chart">
                  <PieChart piechart={piechart} />
                </div>
              </Card>
            </Col>
          </Row>
        </ChartWrapper>
      </Wrapper>
    </>
  );
};

export default Statistics;
