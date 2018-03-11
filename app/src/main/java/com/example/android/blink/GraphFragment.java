package com.example.android.blink;

import android.content.Context;
import android.net.Uri;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.github.mikephil.charting.charts.LineChart;
import com.github.mikephil.charting.components.YAxis;
import com.github.mikephil.charting.data.LineData;
import com.github.mikephil.charting.data.LineDataSet;
import com.github.mikephil.charting.interfaces.datasets.ILineDataSet;
import com.github.mikephil.charting.utils.ColorTemplate;
import com.github.mikephil.charting.utils.FileUtils;

import java.util.ArrayList;

public class GraphFragment extends Fragment {
    public static Fragment newInstance() {
        return new GraphFragment();
    }

    private LineChart mChart;

    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View v = inflater.inflate(R.layout.fragment_graph, container, false);

        mChart = v.findViewById(R.id.blink_chart);

        mChart.getDescription().setEnabled(false);

        mChart.setDrawGridBackground(true);

        ArrayList<ILineDataSet> set = new ArrayList<ILineDataSet>();

        LineDataSet dataset = new LineDataSet(FileUtils.loadEntriesFromAssets(getActivity().getAssets(), "testfile.txt"), "test");

        dataset.setCircleColor(ColorTemplate.VORDIPLOM_COLORS[0]);

        dataset.setColor(ColorTemplate.VORDIPLOM_COLORS[0]);

        dataset.setLineWidth(2.5f);

        dataset.setCircleRadius(3f);

        set.add(dataset);

        LineData mockData = new LineData(set);

        mChart.setData(mockData);

        mChart.animateX(3000);

        return v;
    }
}
