package com.example.android.blink;

import android.graphics.Color;
import android.os.Build;
import android.support.annotation.RequiresApi;
import android.support.v4.widget.SwipeRefreshLayout;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.ProgressBar;
import android.widget.TextView;

import com.github.mikephil.charting.charts.LineChart;
import com.github.mikephil.charting.data.Entry;
import com.github.mikephil.charting.data.LineData;
import com.github.mikephil.charting.data.LineDataSet;
import com.github.mikephil.charting.interfaces.datasets.ILineDataSet;
import com.github.mikephil.charting.utils.ColorTemplate;
import com.github.mikephil.charting.utils.FileUtils;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


public class MainActivity extends AppCompatActivity {
    private SwipeRefreshLayout swipeContainer;
    private FirebaseDatabase database = FirebaseDatabase.getInstance();
    DatabaseReference aggregatedRef = database.getReference("processed");
    DatabaseReference rawRef = database.getReference("raw");

    private TextView caloriesBurned;
    private TextView distanceCovered;
    private ProgressBar eyeFitness;
    private TextView eyeFitnessText;
    private TextView eyeFitnessScore;



    private LineChart mChart;
    private LineDataSet dataset;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mChart = findViewById(R.id.blink_chart);

        mChart.getDescription().setEnabled(false);

        mChart.setDrawGridBackground(true);

        /*set.add(dataset);

        LineData mockData = new LineData(set);

        mChart.setData(mockData);*/

        mChart.animateX(3000);
        swipeContainer = findViewById(R.id.swiperefreshlayout);

        swipeContainer.setOnRefreshListener(new SwipeRefreshLayout.OnRefreshListener() {
            @Override
            public void onRefresh() {
                fetchRawData();
            }
        });

        swipeContainer.setColorSchemeResources(
                android.R.color.holo_blue_bright,
                android.R.color.holo_green_light,
                android.R.color.holo_orange_light,
                android.R.color.holo_red_light

        );
    }

    // Fetch data from firebase
    private void fetchRawData() {
        final ArrayList<Entry> timestamps = new ArrayList<>();
        final ArrayList<Long> rawTimeStamps = new ArrayList<>();
        aggregatedRef.addListenerForSingleValueEvent(new ValueEventListener() {
            @RequiresApi(api = Build.VERSION_CODES.O)
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                Log.d("DATA", dataSnapshot.toString());
                int currentPeriod = 0;
                long totalBlinks = 0;
                for (DataSnapshot child: dataSnapshot.getChildren()) {
                    currentPeriod += 10;
                    for (DataSnapshot kid: child.getChildren()) {
                        Long val = Long.parseLong(kid.getValue().toString());
                        timestamps.add(new Entry(currentPeriod, val));
                        totalBlinks += val;
                    }
                    //Log.i("value", child.getChildren().toString());
                }

                dataset = new LineDataSet(timestamps, "Blinks");

                dataset.enableDashedLine(10f, 5f, 0f);
                dataset.enableDashedHighlightLine(10f, 5f, 0f);
                dataset.setColor(Color.BLACK);
                dataset.setCircleColor(Color.BLACK);
                dataset.setLineWidth(1f);
                dataset.setCircleRadius(3f);
                dataset.setDrawCircleHole(false);
                dataset.setValueTextSize(9f);
                dataset.setDrawFilled(true);

                LineData data = new LineData(dataset);

                mChart.setData(data);

                mChart.invalidate();

                eyeFitness = findViewById(R.id.eye_fitness);

                int eyeFitnessLevel = (int) (totalBlinks/currentPeriod)*60;

                if (eyeFitnessLevel < 15) {
                    String eyeFitnessDiagnosis = "Your blink rate is unhealthy on average. " +
                            "Blink often!";
                    eyeFitnessText = findViewById(R.id.fitness_text_explanation);

                    eyeFitnessScore = findViewById(R.id.score);

                    eyeFitnessScore.setText("" + eyeFitnessLevel);

                    eyeFitnessText.setText(eyeFitnessDiagnosis);

                    eyeFitness.setBackgroundColor(Color.RED);
                    eyeFitness.setProgress(eyeFitnessLevel, true);

                } else {
                    String eyeFitnessDiagnosis = "Your blink rate is healthy on average. Keep it up!";

                    eyeFitnessText = findViewById(R.id.fitness_text_explanation);

                    eyeFitnessText.setText(eyeFitnessDiagnosis);

                    eyeFitnessScore = findViewById(R.id.score);

                    eyeFitnessScore.setText("" + eyeFitnessLevel);

                    eyeFitnessText.setText(eyeFitnessDiagnosis);

                    eyeFitness.setVisibility(View.VISIBLE);
                    eyeFitness.getIndeterminateDrawable().setColorFilter(Color.GREEN,
                            android.graphics.PorterDuff.Mode.SRC_IN);
                    eyeFitness.setProgress(eyeFitnessLevel, true);
                }





                swipeContainer.setRefreshing(false);

            }

            @Override
            public void onCancelled(DatabaseError databaseError) {
                Log.e("DATABASE ERROR", "OPERATION CANCELLED");
            }
        });

        aggregatedRef.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                Log.d("DATA", dataSnapshot.toString());
                for (DataSnapshot child: dataSnapshot.getChildren()) {
                    for (DataSnapshot kid: child.getChildren()) {
                        Long val = Long.parseLong(kid.getValue().toString());
                        rawTimeStamps.add(val);
                    }
                    //Log.i("value", child.getChildren().toString());
                }

                caloriesBurned = findViewById(R.id.calorie_data_result);

                String caloriesBurnedText = "" + rawTimeStamps.size() * 0.03;
                caloriesBurned.setText(caloriesBurnedText);

                String distanceCoveredText = "" + rawTimeStamps.size() * 0.015 ;

                distanceCovered = findViewById(R.id.distance_data_result);

                distanceCovered.setText(distanceCoveredText);

            }



            @Override
            public void onCancelled(DatabaseError databaseError) {
                Log.e("DATABASE ERROR", "OPERATION CANCELLED");
            }


        });

    }
}
