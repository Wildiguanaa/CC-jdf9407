# coding=utf-8
#
# Copyright 2022 Windell H. Oskay, Evil Mad Scientist Laboratories
#
# This program is free software; you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation; either version 2 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program; if not, write to the Free Software
# Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA

"""
preview.py

Classes for managing AxiDraw plot preview data

Part of the AxiDraw driver for Inkscape
https://github.com/evil-mad/AxiDraw


"""

# import time
# from axidrawinternal.plot_utils_import import from_dependency_import
# plot_utils = from_dependency_import('plotink.plot_utils')
# ebb_serial = from_dependency_import('plotink.ebb_serial')  # https://github.com/evil-mad/plotink
# ebb_motion = from_dependency_import('plotink.ebb_motion')
# inkex = from_dependency_import('ink_extensions.inkex')


class VelocityChart:
    """
    Preview: Class for velocity data plots
    """

    def __init__(self):
        self.vel_data_time = 0
        self.vel_chart1 = [] # Velocity chart, for preview of velocity vs time Motor 1
        self.vel_chart2 = []  # Velocity chart, for preview of velocity vs time Motor 2
        self.vel_data_chart_t = [] # Velocity chart, for preview of velocity vs time Total V

    def reset(self):
        """ Clear data; reset for a new plot. """
        self.vel_data_time = 0
        self.vel_chart1.clear()
        self.vel_chart2.clear()
        self.vel_data_chart_t.clear()

    def v_chart_rest(self, v_time):
        """
        Update velocity charts and plot time estimate with a zero-velocity segment for
        given time duration; typicaly used after raising or lowering the pen.
        """
        if not self.options.preview:
            return
        self.update_v_charts(0, 0, 0)
        self.vel_data_time += v_time
        self.update_v_charts(0, 0, 0)
        self.pt_estimate += v_time


    def update_v_charts(self, v_1, v_2, v_total):
        """ Update velocity charts, using some appropriate scaling for X and Y display."""
        if not self.vel_data_plot:
            return
        temp_time = self.vel_data_time / 1000.0
        scale_factor = 10.0 / self.options.resolution
        self.vel_chart1.append(" {0:0.3f} {1:0.3f}".format(temp_time, 8.5 - v_1 / scale_factor))
        self.vel_chart2.append(" {0:0.3f} {1:0.3f}".format(temp_time, 8.5 - v_2 / scale_factor))
        self.vel_data_chart_t.append(\
            " {0:0.3f} {1:0.3f}".format(temp_time, 8.5 - v_total / scale_factor))


class Preview:
    """
    Preview: Main class for organizing preview and rendering
    """

    def __init__(self):
        self.path_data_pu = []  # pen-up path data for preview layers
        self.path_data_pd = []  # pen-down path data for preview layers
        self.pt_estimate = 0 # plot time estimate, milliseconds
        self.vel_chart = VelocityChart()

    def reset(self):
        """ Clear all data; reset for a new plot. """
        self.path_data_pu.clear()
        self.path_data_pd.clear()
        self.pt_estimate = 0
        self.vel_chart.reset()

    def add_time(self, time_ms):
        """ Add time to estimated total plot duration """
        self.pt_estimate += time_ms



