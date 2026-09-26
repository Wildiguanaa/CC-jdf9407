# coding=utf-8
# drawcore_serial.py
# Serial connection utilities for DrawCore


from distutils.version import LooseVersion
import gettext
import logging
import time
from .plot_utils_import import from_dependency_import
inkex = from_dependency_import('ink_extensions.inkex')
serial = from_dependency_import('serial')

logger = logging.getLogger(__name__)

def version():      # Version number for this document
    return "23.0103"   # Dated 2023-01-03


def findPort():
    # Find first available Board by searching USB ports.
    # Return serial port object.
    try:
        from serial.tools.list_ports import comports
    except ImportError:
        return None
    if comports:
        try:
            com_ports_list = list(comports())
        except TypeError:
            return None
        drawcore_port = None
        for port in com_ports_list:
            # if port[1].startswith("USB-SERIAL"):
            #     drawcore_port = port[0]  # Success; 
            #     break  # stop searching-- we are done.
            # if port[1].startswith("USB Serial"):
            #     drawcore_port = port[0]  # Success; 
            #     break  # stop searching-- we are done.
            if port[2].startswith("USB VID:PID=1A86:7523"):
                drawcore_port = port[0]  # Success; DrawCore found by VID/PID match.
                break
            if port[2].startswith("USB VID:PID=1A86:8040"):
                drawcore_port = port[0]  # Success; DrawCore found by VID/PID match.
                break
        if drawcore_port == None:
            for port in com_ports_list:
                logger.error('com_port: {0}'.format(port))
        return drawcore_port

def list_port_info():
    # Find and return a list of all USB devices and their information.
    try:
        from serial.tools.list_ports import comports
    except ImportError:
        return None
    if comports:
        com_ports_list = list(comports())
        return com_ports_list
        # port_info_list = []
        # for port in com_ports_list:
        #     port_info_list.append(port) # port name
            # port_info_list.append(port[0]) # port name
            # port_info_list.append(port[1]) # Identifier
            # port_info_list.append(port[2]) # VID/PID
        # if port_info_list:
        #     return port_info_list


def listDRAWCOREports():
    # Find and return a list of all EiBotBoard units
    # connected via USB port.
    try:
        from serial.tools.list_ports import comports
    except ImportError:
        return None
    if comports:
        com_ports_list = list(comports())
        drawcore_ports_list = []
        for port in com_ports_list:
            # logger.error('com_port: {0}'.format(port[1]))
            port_has_drawcore = False
            # if port[1].startswith("USB-SERIAL"):
            #     port_has_drawcore = True
            # if port[1].startswith("USB Serial"):
            #     port_has_drawcore = True
            if port[2].startswith("USB VID:PID=1A86:7523"):
                port_has_drawcore = True  # Success; DrawCore found by VID/PID match.
            if port[2].startswith("USB VID:PID=1A86:8040"):
                port_has_drawcore = True  # Success; DrawCore found by VID/PID match.

            if port_has_drawcore:
                drawcore_ports_list.append(port)
        if drawcore_ports_list:
            return drawcore_ports_list

def find_named(port_name):
    return None
                        
def testPort(port_name):
    """
    Open a given serial port, verify that it is an EiBotBoard,
    and return a SerialPort object that we can reference later.

    This routine only opens the port;
    it will need to be closed as well, for example with closePort( port_name ).
    You, who open the port, are responsible for closing it as well.

    """
    if port_name is not None:
        try:
            # serial_port = serial.Serial(port_name, timeout=1.0)  # 1 second timeout!
            serial_port = serial.Serial()
            serial_port.port = port_name
            serial_port.baudrate = 115200
            serial_port.timeout = 1
            serial_port.setRTS(False)
            serial_port.setDTR(False)
            serial_port.open()

            # serial_port.flushInput()  # deprecated function name;
            # use serial_port.reset_input_buffer()
            # if we can be sure that we have pySerial 3+.
            # serial_port.readline()
            # n = serial_port.in_waiting
            # logger.error("Error reading serial data%d"%n)
            # while n > 0:
            #     n = serial_port.in_waiting
            #     serial_port.readline()
            serial_port.write('v\r'.encode('ascii'))
            str_version = serial_port.readline()
            if str_version and str_version.startswith("DrawCore".encode('ascii')):
                serial_port.flushInput()
                return serial_port
            n = serial_port.in_waiting
            
            while n > 0:
                n = serial_port.in_waiting
                serial_port.readline()

            serial_port.write('v\r'.encode('ascii'))
            str_version = serial_port.readline()
            if str_version and str_version.startswith("DrawCore".encode('ascii')):
                serial_port.flushInput()
                return serial_port   
            serial_port.write('v\r'.encode('ascii'))
            str_version = serial_port.readline()
            if str_version and str_version.startswith("DrawCore".encode('ascii')):
                serial_port.flushInput()
                return serial_port
            serial_port.close()
        except serial.SerialException as err:
            logger.error("Error testing serial port `{}` connection".format(port_name))
            logger.info("Error context:", exc_info=err)
        return None


def openPort():
    # Find and open a port to a single attached EiBotBoard.
    # The first port located will be used.
    found_port = findPort()
    serial_port = testPort(found_port)
    if serial_port:
        return serial_port
    else:
        logger.error('error  open com_port: {0}'.format(found_port))
        return None


def closePort(port_name):
    if port_name is not None:
        try:
            port_name.close()
        except serial.SerialException:
            pass


def query(port_name, cmd):
    if port_name is not None and cmd is not None:
        response = ''
        try:
            port_name.write(cmd.encode('ascii'))
            response = port_name.readline().decode('ascii')
            n_retry_count = 0
            while len(response) == 0 and n_retry_count < 20:
                # get new response to replace null response if necessary
                response = port_name.readline()
                n_retry_count += 1
            if cmd.split(",")[0].strip().lower() not in ["v", "i", "a", "mr", "pi", "qm"]:
                # Most queries return an "OK" after the data requested.
                # We skip this for those few queries that do not return an extra line.
                unused_response = port_name.readline()  # read in extra blank/OK line
                n_retry_count = 0
                while len(unused_response) == 0 and n_retry_count < 20:
                    # get new response to replace null response if necessary
                    unused_response = port_name.readline()
                    n_retry_count += 1
        except (serial.SerialException, IOError, RuntimeError, OSError) as err:
            logger.error("Error reading serial data")
            logger.info("Error context:", exc_info=err)
        return response


def command(port_name, cmd):
    if port_name is not None and cmd is not None:
        try:
            port_name.write(cmd.encode('ascii'))
            response = port_name.readline().decode('ascii')
            n_retry_count = 0
            while len(response) == 0 and n_retry_count < 20:
                # get new response to replace null response if necessary
                response = port_name.readline().decode('ascii')
                n_retry_count += 1
            if response.strip().startswith("ok"):
                # Debug option: indicate which command:
                # inkex.errormsg( 'OK after command: ' + cmd )
                pass
            else:
                if response:
                    error_msg = '\n'.join(('Unexpected response from DrawCore.',
                                           '    Command: {0}'.format(cmd.strip()),
                                           '    Response: {0}'.format(response.strip())))
                else:
                    error_msg = 'DrawCore Serial Timeout after command: {0}'.format(cmd)
                logger.error(error_msg)
        except (serial.SerialException, IOError, RuntimeError, OSError) as err:
            if cmd.strip().lower() not in ["rb"]: # Ignore error on reboot (RB) command
                logger.error('Failed after command: {0}'.format(cmd))
                logger.info("Error context:", exc_info=err)

def min_version(port_name, version_string):
    # Query the DrawCore firmware version for the DrawCore located at port_name.
    # Return True if the DrawCore firmware version is at least version_string.
    # Return False if the DrawCore firmware version is below version_string.
    # Return None if we are unable to determine True or False.

    if port_name is not None:
        drawcore_version_string = queryVersion(port_name)  # Full string, human readable
        drawcore_version_string = drawcore_version_string.split("Firmware Version ", 1)

        if len(drawcore_version_string) > 1:
            drawcore_version_string = drawcore_version_string[1]
        else:
            return None  # We haven't received a reasonable version number response.

        drawcore_version_string = drawcore_version_string.strip()  # Stripped copy, for number comparisons
        if LooseVersion(drawcore_version_string) >= LooseVersion(version_string):
            return True
        else:
            return False


def queryVersion(port_name):
    return query(port_name, 'V\r')  # Query DrawCore Version String
